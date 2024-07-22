import { Hono, isoNow} from "@/util.ts";

export default new Hono().get("/api/*", async (c) => {
  const example = await fetch(
    "https://api.coindesk.com/v1/bpi/currentprice.json"
  );
  return c.json({
    data: await example.json(),
    renderedAt: isoNow(),
  });
});
