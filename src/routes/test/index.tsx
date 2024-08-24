import { Hono } from "hono";
import { hybrid } from "@/client/islands/index.ts";

export default new Hono()
  .get("/", (c) => c.render(<hybrid.LoremIpsum count={2} />))
  .get("/btc", (c) => c.render(<hybrid.BtcPrice />, { title: "Up forever" }));
