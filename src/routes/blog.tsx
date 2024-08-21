import { Hono } from "hono";
import { hybrid } from "@/client/islands/index.ts";

export default new Hono().get("/", (c) => {
  return c.render(<hybrid.LoremIpsum />);
});
