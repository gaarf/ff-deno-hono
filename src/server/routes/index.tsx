import { Hono } from "hono";
import { DateTime, httpNow, type PropsWithChildren } from "@/utils.ts";
import { LoremIpsum } from "@/client/islands/LoremIpsum.tsx";
import { nestedLayout } from "@/server/middleware.tsx";

const Landing = ({ children }: PropsWithChildren) => {
  const uptime = DateTime.fromHTTP(String(children));
  const diff = uptime.diffNow();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl">Welcome!</h1>

        {diff.isValid && (
          <aside className="font-mono">
            server uptime:{" "}
            <time dateTime={diff.toISO()}>{diff.negate().toHuman()}</time>
          </aside>
        )}
      </div>

      <LoremIpsum count={3} />
    </div>
  );
};

export default new Hono().all("/", nestedLayout(Landing), (c) =>
  c.render(httpNow())
);
