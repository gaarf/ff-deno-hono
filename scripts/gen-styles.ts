import autoprefixer from "npm:autoprefixer";
import tailwindcss from "npm:tailwindcss";
import cssnano from "npm:cssnano";
import postcss from "npm:postcss";

const TARGET = ".generated/styles.ts";
const cssIn = "src/app.css";

const prod = Deno.env.get("GEN_ENV") === 'bundle';
const plugins: Parameters<typeof postcss> = [tailwindcss, autoprefixer];
if (prod) {
  plugins.push(cssnano);
}

const result = await postcss(plugins).process(
  Deno.readTextFileSync(cssIn),
  { from: cssIn, to: "styles.css", map: { inline: true } }
);

Deno.writeTextFileSync(
  TARGET,
  `/* generated, do not edit */\n`.concat(
    `export default ${JSON.stringify(result.css)};\n`,
    `export const cssMap = ${JSON.stringify(result.map)};\n`
  )
);
console.log(`✍️ styles (${prod?'prod':'dev'})`);
