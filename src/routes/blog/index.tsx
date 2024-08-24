import { Hono } from "hono";
import { hybrid } from "@/client/islands/index.ts";
import { Message } from "@/server/layout/Message.tsx";

export default new Hono().get("/", async (c) => {
  const q = c.get("db").from("posts").select();
  const by = c.req.query("by");
  if (by) {
    q.eq("author_id", by);
  }
  const { data: posts, error } = await q
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    return c.render(<Message intent="danger">{error.message}</Message>);
  }

  return c.render(<hybrid.Landing posts={posts!} />);
});
