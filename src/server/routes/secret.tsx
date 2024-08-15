import { Hono } from "hono";
import { Button, Code, Json } from "@/components";
import { requireAuth } from "@/supabase/server.ts";

export default new Hono().get("/", requireAuth, async (c) => {
  const { data: { session } } = await c.get("db").auth.getSession();

  return c.render(
    <section className="flex flex-col gap-4">
      <p>
        Hello <Code>{session?.user.email || session?.user.id || "hacker"}</Code>
      </p>
      <Button href="/auth/logout">Logout</Button>
      <Json value={session} />
    </section>,
  );
});
