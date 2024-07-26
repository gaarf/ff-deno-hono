import app from "@/app.ts";

Deno.serve((request) => {
  if (
    new URL(request.url).pathname === "/hmr" &&
    request.headers.get("upgrade") === "websocket"
  ) {
    const { socket, response } = Deno.upgradeWebSocket(request);

    socket.onopen = () => {
      console.log("WebSocket OPEN");
    };
    socket.onclose = () => {
      console.log("WebSocket CLOSE");
    };

    return response;
  } else {
    return app.fetch(request);
  }
});
