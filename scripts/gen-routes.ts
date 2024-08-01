import { join, basename } from "std/path/mod.ts";

const TARGET = ".generated/routes.ts";

async function parse(dir = "routes", path = "/") {
  const output: Record<string, string> = {};
  for await (const route of Deno.readDir(`src/server/${dir}`)) {
    const { name, isDirectory } = route;
    const fname = basename(name, ".tsx");
    if (fname.match(/^[A-Z]+/)) { // uppercase first letter
      continue;
    }
    const routePath = join(path, fname);
    const dname = join(dir, name);
    if (isDirectory) {
      Object.assign(output, await parse(dname, routePath));
    } else {
      output[fname === "index" ? path : routePath] = dname;
    }
  }

  return output;
}

const routes = Object.entries(await parse());

Deno.writeTextFileSync(
  TARGET,
  `/* generated, do not edit */\n`.concat(
    routes
      .map(
        ([, file], index) => `import f${index} from "${join("../src/server/", file)}";`
      )
      .join("\n"),
    `\n\nexport default {\n`,
    routes.map(([path], index) => `\t"${path}": f${index},`).join("\n"),
    "\n};\n"
  )
);
console.log("✍️ routes");
