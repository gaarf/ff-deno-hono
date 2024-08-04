import * as esbuild from "esbuild";
import { denoPlugins } from "esbuild_deno_loader";
import { resolve } from "std/path/mod.ts";

const TARGET = ".generated/client";
const TEMP_TARGET = TARGET + ".js";
const FINAL_TARGET = TARGET + ".ts";

const prod = Deno.env.get("NODE_ENV") === "production";

await esbuild.build({
  plugins: [
    ...(denoPlugins({
      configPath: resolve(".", "deno.json"),
    }) as esbuild.Plugin[]),
  ],
  entryPoints: ["src/client/index.tsx"],
  outfile: TEMP_TARGET,
  platform: "browser",
  bundle: true,
  sourcemap: prod ? false : "linked",
  jsx: "automatic",
  jsxImportSource: "react",

  ...(prod && {
    dropLabels: ["DEV"],
    minify: true,
  }),
});

esbuild.stop();

const tempFiles = [TEMP_TARGET];
if (!prod) {
  tempFiles.push(TEMP_TARGET + ".map");
}
const [strOfJs, mapOfJs] = await Promise.all(
  tempFiles.map((file) => Deno.readTextFile(file)),
).finally(() => tempFiles.forEach((file) => Deno.remove(file)));

Deno.writeTextFileSync(
  FINAL_TARGET,
  `/* generated, do not edit */\n`.concat(
    `export default ${JSON.stringify(strOfJs)};\n`,
    `export const jsMap = ${prod ? "undefined" : mapOfJs};\n`,
  ),
);

console.log(`✍️ client (${prod ? "prod" : "dev"})`);
