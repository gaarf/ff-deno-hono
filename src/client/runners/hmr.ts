export default async function hmr(_opts: unknown) {
  DEV: {
    const { debounce } = await import("std/async/debounce.ts");

    let errorCount = 0;

    const connect = () => {
      const reconnect = debounce(connect, 1000);
      const ws = new WebSocket("/hmr");

      ws.onopen = () => {
        console.info(ws);
        errorCount = 0;
      };

      ws.onmessage = (event) => {
        console.log(event);
      };

      ws.onerror = () => {
        errorCount++;
      };

      ws.onclose = () => {
        if (errorCount < 3) {
          reconnect();
        }
      };

    };
    connect();

    break DEV;
  }
}
