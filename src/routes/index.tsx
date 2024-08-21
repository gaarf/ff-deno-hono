import { Hono } from "hono";
import { DateTime, httpNow } from "@/utils.ts";
import { hybrid } from "@/client/islands/index.ts";

const bootTime = httpNow();

export default new Hono().all("/", async (c) => {
  const diff = DateTime.fromHTTP(bootTime).diffNow();

  const { data: posts } = await c.get("db").from("posts").select();

  return c.render(
    <>
      <hybrid.Landing posts={posts!} />

      {diff.isValid && (
        <aside className="mt-4 font-mono text-xs">
          server uptime:{" "}
          <time dateTime={diff.toISO()}>{diff.negate().toHuman()}</time>
        </aside>
      )}
    </>,
    { title: "Bliki", icon: "☝️" }
  );
});
