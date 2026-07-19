import { copyFileSync, cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Main process
 */
function main() {
  if (existsSync("_site")) {
    console.error("_site directory already exsits.");
    process.exit(1);
  }
  mkdirSync("_site");
  cpSync("data", join("_site", "data"), { recursive: true });
  cpSync("dist", join("_site", "dist"), { recursive: true });
  cpSync("en-US", join("_site", "en-US"), { recursive: true });
  cpSync("ja", join("_site", "ja"), { recursive: true });
  copyFileSync("index.html", join("_site", "index.html"));
}

// Execute the script
main();
