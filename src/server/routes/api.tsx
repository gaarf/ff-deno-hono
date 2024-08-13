import { Hono } from "hono";
import { isoNow } from "@/utils.ts";

export default new Hono()
  .get("/btc", async (c) => {
    const data = await fetch(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    ).then((result) => result.json());
    return c.json({
      data,
      renderedAt: isoNow(),
    });
  })
  // .get("/v0/posts", async (c) => {
  //   const data = c.get('supabase')
  //   return c.json({
  //     data,
  //     renderedAt: isoNow(),
  //   });
  // });
