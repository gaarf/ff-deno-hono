import { Hono } from "hono";

export default new Hono().get("/btc", async (c) => {
  const data = await fetch(
    "https://api.coindesk.com/v1/bpi/currentprice.json"
  );

  return c.json(await data.json());
});
