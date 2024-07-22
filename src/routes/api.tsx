import { Hono, isoNow} from "@/util.ts";

export default new Hono()
  .get("/*", async (c) => {
    const { time, disclaimer, bpi } = await fetch(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    ).then(result => result.json());
    return c.json({
      btc: {
        updated: time.updated,
        disclaimer,
        usd: bpi.usd.rate_float
      },
      renderedAt: isoNow(),
    });
  });
