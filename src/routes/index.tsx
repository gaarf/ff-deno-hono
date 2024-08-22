import { Hono } from "hono";
import { hybrid } from "@/client/islands/index.ts";

export default new Hono().all("/", async (c) => {
  const { data: posts } = await c.get("db").from("posts").select()
    .throwOnError();

  return c.render(<hybrid.Landing posts={posts!} />, {
    title: "Bliki",
    icon: "☝️",
  });
});
