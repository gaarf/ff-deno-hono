import app from "@/app.ts";

let hmrSockets: WebSocket[] = [];

Deno.serve((request) => {
  if (
    (new URL(request.url)).pathname === "/hmr" &&
    request.headers.get("upgrade") === "websocket"
  ) {
    const { socket, response } = Deno.upgradeWebSocket(request);

    socket.onopen = () => {
      console.log("WebSocket CONNECTED");
      hmrSockets.push(socket);
    };
    socket.onmessage = (event) => {
      console.log(`WebSocket RECEIVED: ${event.data}`);
      socket.send("pong");
    };
    socket.onclose = () => {
      console.log("WebSocket DISCONNECTED");
      hmrSockets = hmrSockets.filter((one) => one === socket);
    };
    socket.onerror = (error) => console.error("WebSocket ERROR:", error);

    return response;
  } else {
    return app.fetch(request);
  }
});

addEventListener("hmr", (event) => {
  const { detail } = event as CustomEvent;
  hmrSockets.forEach(socket => {
    socket.send(detail?.path);
  });
});
