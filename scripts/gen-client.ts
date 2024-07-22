import * as esbuild from "esbuild";
import { denoPlugins } from "esbuild_deno_loader";
import { resolve } from "std/path/mod.ts";

const TARGET = ".generated/client.js";
const configPath = resolve('.', 'deno.json');
console.log(configPath);

await esbuild.build({
  plugins: [...(denoPlugins({ configPath }) as esbuild.Plugin[])],
  entryPoints: ["src/client/index.tsx"],
  outfile: TARGET,
  platform: "browser",
  bundle: true,
  sourcemap: "linked",
  jsx: "transform",
  jsxFactory: "",
  jsxImportSource: "hono/jsx",
  // minify: true,
});

console.log("✍️ client");

esbuild.stop();
