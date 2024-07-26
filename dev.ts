import app from "@/app.ts";

const log = ({ type }: Event) => console.info(`DEV HMR ${type}`);


Deno.serve((request) => {
  if (
    new URL(request.url).pathname === "/hmr" &&
    request.headers.get("upgrade") === "websocket"
  ) {
    const { socket, response } = Deno.upgradeWebSocket(request);

    socket.onopen = log;
    socket.onmessage = log;
    socket.onclose = log;

    return response;
  } else {
    return app.fetch(request);
  }
});
