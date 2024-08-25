import { Hono } from "hono";
import { hybrid } from "@/client/islands/index.ts";
import { requireAuth } from "@/supabase/server.ts";
import { setMessage } from "@/server/layout/Message.tsx";

export default new Hono()
  .all("/", requireAuth)
  .post("/", async (c, next) => {
    const body = await c.req.formData();
    const title = body.get("title")?.toString();
    const content = String(body.get("content"));

    const { data, error } = await c
      .get("db")
      .from("posts")
      .insert({ title, content })
      .select("id")
      .maybeSingle();

    if (error) {
      setMessage(c, error.message, "danger");
      return next();
    }

    return c.redirect(`/blog/post/${data?.id}`);
  })
  .get("/", (c) => {
    return c.render(<hybrid.PostForm />);
  });
