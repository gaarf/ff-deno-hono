export default function hmr(_opts: unknown) {
  DEV: {
    const ws = () => new WebSocket("/hmr");

    let attempts = 0;
    const onclose = () => {
      console.log("HMR to reload...");
      setTimeout(() => {
        attempts++;
        const reconnect = ws();
        reconnect.onopen = () => {
          reconnect.close();
          location.reload();
        };
        if(attempts < 3) {
          reconnect.onerror = onclose;
        }
      }, 200 + (attempts * 100));
    }

    const hmr = ws();

    hmr.onmessage = ({ data }) => {
      console.log(data);
    };

    hmr.onclose = onclose;

    break DEV;
  }
}
