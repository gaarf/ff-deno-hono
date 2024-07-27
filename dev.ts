import app from "@/app.ts";
import { debounce } from "std/async/debounce.ts";

let hmrSockets: WebSocket[] = [];

Deno.serve((request) => {
  if (request.headers.get("upgrade") === "websocket") {
    const { socket, response } = Deno.upgradeWebSocket(request);

    socket.onopen = () => {
      hmrSockets.push(socket);
      console.log("hmrSockets: ", hmrSockets.length);
    };
    socket.onclose = () => {
      hmrSockets = hmrSockets.filter((one) => one !== socket);
      console.log("hmrSockets: ", hmrSockets.length);
    };

    return response;
  } else {
    // Hono
    return app.fetch(request);
  }
});

const srcPath = Deno.cwd() + "/src";
console.log("Watching", srcPath);
const watcher = Deno.watchFs(srcPath);

const runTask = (name: string) => {
  const command = new Deno.Command(Deno.execPath(), {
    args: ["task", name],
    stdout: "piped",
  });
  const { stdout } = command.outputSync();
  const output = new TextDecoder().decode(stdout).trim();
  console.log(output);
  for (const socket of hmrSockets) {
    socket.send(output);
  }
};

const handleEvent = debounce(({ paths, kind }: Deno.FsEvent) => {
  const path = paths[0].replace(srcPath, "");
  console.log(kind, path);
  if (path.startsWith("routes")) {
    runTask("gen:routes");
  } else {
    runTask("gen:client");
    runTask("gen:styles");
  }
}, 1);

for await (const event of watcher) {
  handleEvent(event);
}
