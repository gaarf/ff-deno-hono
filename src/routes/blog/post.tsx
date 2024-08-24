import { Hono } from "hono";
import { hybrid } from "@/client/islands/index.ts";
import { Message } from "@/server/layout/Message.tsx";

export default new Hono().get("/:id", async (c) => {
  const id = parseInt(c.req.param("id"), 10);

  if (isNaN(id)) {
    c.status(400);
    return c.render(<Message intent="danger">Invalid post id</Message>);
  }

  const { data: post } = await c
    .get("db")
    .from("posts")
    .select()
    .eq("id", id)
    .maybeSingle()
    .throwOnError();

  if (!post) {
    c.status(404);
    return c.render(<Message intent="warning">Post not found</Message>);
  }

  return c.render(<hybrid.Landing posts={[post]} />);
});
