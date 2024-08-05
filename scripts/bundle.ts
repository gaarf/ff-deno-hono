import * as esbuild from "esbuild";
import { denoPlugins } from "esbuild_deno_loader";
import { resolve } from "std/path/mod.ts";
import { format } from "std/fmt/bytes.ts";

const OUTFILE = ".generated/o.js";
const NODE_ENV = Deno.env.get("NODE_ENV");
const minify = !Deno.env.get("NO_MINIFY");
console.log({ NODE_ENV, minify });

await esbuild.build({
  plugins: [
    ...(denoPlugins({
      configPath: resolve(".", "deno.json"),
    }) as esbuild.Plugin[]),
  ],
  entryPoints: ["main.js"],
  platform: "browser", // smaller bundle?
  format: 'esm',
  outfile: OUTFILE,
  jsx: "automatic",
  jsxImportSource: "react",
  dropLabels: ["DEV"], // works fine
  bundle: true,
  minify
});

esbuild.stop();

const { size } = await Deno.stat(OUTFILE);

console.log(`${OUTFILE}: ${format(size)}`);
