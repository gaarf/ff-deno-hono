import * as esbuild from "esbuild";
import { denoPlugins } from "esbuild_deno_loader";
import { resolve } from "std/path/mod.ts";
import { format } from "std/fmt/bytes.ts";

const OUTFILE = ".generated/o.js";
const NODE_ENV = Deno.env.get("NODE_ENV");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const minify = NODE_ENV === "production";
console.log("Bundling...", { NODE_ENV, SUPABASE_URL, minify });

await esbuild.build({
  plugins: [
    ...(denoPlugins({
      configPath: resolve(".", "deno.json"),
    }) as esbuild.Plugin[]),
  ],
  entryPoints: ["main.js"],
  platform: "browser", // smaller bundle?
  format: "esm",
  outfile: OUTFILE,
  jsx: "automatic",
  jsxImportSource: "react",
  define: {
    "SUPABASE_URL": `"${Deno.env.get("SUPABASE_URL")}"`,
    "SUPABASE_ANON_KEY": `"${Deno.env.get("SUPABASE_ANON_KEY")}"`,
  },
  dropLabels: ["DEV"], // works fine
  bundle: true,
  minify,
});

esbuild.stop();

const { size } = await Deno.stat(OUTFILE);

console.log(`${OUTFILE}: ${format(size)}`);
