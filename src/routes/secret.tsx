import { Hono } from "hono";
import { Code } from "@/components";
import { requireAuth, userPromise } from "@/supabase/server.ts";

export default new Hono().use(requireAuth).get("/", async (c) => {
  const user = await userPromise(c);

  return c.render(
    <section className="flex flex-col gap-4">
      <p>
        Hello <Code>{user?.email || user?.id || "hacker"}</Code>
      </p>
    </section>,
  );
});
