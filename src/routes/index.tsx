import { Hono } from "hono";
import { DateTime, httpNow } from "@/utils.ts";
import { hybrid } from "@/client/islands/index.ts";

const bootTime = httpNow();

export default new Hono().all("/", (c) => {
  const diff = DateTime.fromHTTP(bootTime).diffNow();
  return c.render(
    <>
      <hybrid.Landing />

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
