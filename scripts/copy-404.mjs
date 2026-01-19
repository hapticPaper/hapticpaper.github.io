import { constants } from "node:fs";
import { access, copyFile } from "node:fs/promises";
import { resolve } from "node:path";

const src = resolve("dist/index.html");
const dest = resolve("dist/404.html");

try {
  await access(src, constants.R_OK);
  await copyFile(src, dest);
} catch (error) {
  console.error("Failed to create dist/404.html from dist/index.html:", error);
  process.exitCode = 1;
}
