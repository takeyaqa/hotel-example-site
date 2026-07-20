import { createReadStream } from "node:fs";
import { realpath, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, isAbsolute, join, relative, resolve, sep } from "node:path";

const host = process.env.HOST ?? "localhost";
const port = Number.parseInt(process.env.PORT ?? "8080", 10);
const root = await realpath(resolve(process.argv[2] ?? "."));

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

function send(response, status, message, method = "GET") {
  const body = `${status} ${message}\n`;

  response.writeHead(status, {
    "Content-Type": "text/plain; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
  });

  response.end(method === "HEAD" ? undefined : body);
}

function isInsideRoot(path) {
  const pathFromRoot = relative(root, path);

  return (
    pathFromRoot === "" ||
    (!pathFromRoot.startsWith(`..${sep}`) && pathFromRoot !== ".." && !isAbsolute(pathFromRoot))
  );
}

const server = createServer(async (request, response) => {
  const method = request.method ?? "GET";

  if (method !== "GET" && method !== "HEAD") {
    response.setHeader("Allow", "GET, HEAD");
    send(response, 405, "Method Not Allowed", method);
    return;
  }

  let pathname;

  try {
    const url = new URL(request.url ?? "/", "http://localhost");
    pathname = decodeURIComponent(url.pathname);
  } catch {
    send(response, 400, "Bad Request", method);
    return;
  }

  if (pathname.includes("\0")) {
    send(response, 400, "Bad Request", method);
    return;
  }

  const relativePath = pathname.replace(/^\/+/, "");
  let filePath = resolve(root, relativePath);

  if (!isInsideRoot(filePath)) {
    send(response, 403, "Forbidden", method);
    return;
  }

  try {
    let fileStat = await stat(filePath);

    if (fileStat.isDirectory()) {
      filePath = join(filePath, "index.html");
      fileStat = await stat(filePath);
    }

    if (!fileStat.isFile()) {
      send(response, 404, "Not Found", method);
      return;
    }

    // Resolve symlinks and verify that they do not escape the server root.
    const realFilePath = await realpath(filePath);

    if (!isInsideRoot(realFilePath)) {
      send(response, 403, "Forbidden", method);
      return;
    }

    const contentType =
      MIME_TYPES[extname(realFilePath).toLowerCase()] ?? "application/octet-stream";

    response.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": fileStat.size,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });

    if (method === "HEAD") {
      response.end();
      return;
    }

    const stream = createReadStream(realFilePath);

    stream.on("error", () => {
      response.destroy();
    });

    stream.pipe(response);
  } catch (error) {
    if (error?.code === "ENOENT" || error?.code === "ENOTDIR") {
      send(response, 404, "Not Found", method);
      return;
    }

    console.error(error);
    send(response, 500, "Internal Server Error", method);
  }
});

server.listen(port, host, () => {
  console.log(`Serving ${root}`);
  console.log(`http://${host}:${port}/`);
});
