import * as esbuild from "esbuild";
import { denoPlugins } from "esbuild_deno_loader";
import { resolve } from "std/path/mod.ts";
import { format } from "std/fmt/bytes.ts";

const OUTFILE = ".generated/o.js";

await esbuild.build({
  plugins: [
    ...(denoPlugins({
      configPath: resolve(".", "deno.json"),
    }) as esbuild.Plugin[]),
  ],
  entryPoints: ["main.js"],
  platform: "neutral",
  outfile: OUTFILE,
  jsx: "automatic",
  jsxImportSource: "hono/jsx",
  dropLabels: ["DEV"], // works fine
  bundle: true,
  minify: true,
});

esbuild.stop();

const { size } = await Deno.stat(OUTFILE);

console.log(`${OUTFILE}: ${format(size)}`);
