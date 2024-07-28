export default async function hmr(_opts: unknown) {
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

    await new Promise((resolve, reject) => {  
      const hmr = ws();
      hmr.onclose = onclose;
      hmr.onerror = reject;
      hmr.onopen = () => resolve(console.info("HMR ready"));
      hmr.onmessage = ({ data }) => console.log(data);
    });

    break DEV;
  }
}
