import { Hono } from "hono";
import { isoNow } from "@/utils.ts";

export default new Hono()
  .get("/*", async (c) => {
    const data = await fetch(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    ).then(result => result.json());
    return c.json({
      data,
      renderedAt: isoNow(),
    });
  });
