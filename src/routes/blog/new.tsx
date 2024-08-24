import { Hono } from "hono";
// import { hybrid } from "@/client/islands/index.ts";
// import { Message } from "@/server/layout/Message.tsx";
import { requireAuth } from "@/supabase/server.ts";

export default new Hono()
  .all('/', requireAuth)
  .get('/', (c) => {
    return c.render('new blog post');
  })

