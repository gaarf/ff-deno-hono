export default function hmr(_opts: unknown) {
  DEV: {
    const ws = new WebSocket("/hmr");

    ws.onclose = (event) => {
      console.log("HMR to reload....", event);
      setTimeout(() => {
        location.reload();
      }, 888);
    };

    break DEV;
  }
}
