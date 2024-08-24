import { Hono } from "hono";

export type ApiBtc = { bpi: { USD: { rate_float: number } } };

export default new Hono().get("/btc", async (c) => {
  const data = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");

  c.header('cache-control', 'max-age=30, must-revalidate');
  return c.json((await data.json()) as ApiBtc);
});
