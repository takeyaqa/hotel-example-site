import { copyFileSync, cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

/**
 * Main process
 */
function main() {
  if (existsSync("_site")) {
    rmSync("_site", { recursive: true });
  }
  mkdirSync("_site");
  cpSync("css", join("_site", "css"), { recursive: true });
  cpSync("data", join("_site", "data"), { recursive: true });
  cpSync("dist", join("_site", "dist"), { recursive: true });
  cpSync("en-US", join("_site", "en-US"), { recursive: true });
  cpSync("ja", join("_site", "ja"), { recursive: true });
  cpSync("src", join("_site", "src"), { recursive: true });
  copyFileSync("index.html", join("_site", "index.html"));
}

// Execute the script
main();
