import { Hono } from "hono";
import { DateTime, httpNow } from "@/utils.ts";
import { LoremIpsum } from "@/client/islands/LoremIpsum.tsx";

const bootTime = httpNow();

const Landing = () => {
  const diff = DateTime.fromHTTP(bootTime).diffNow();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl">Welcome!</h1>

        {diff.isValid && (
          <aside className="font-mono text-right">
            server uptime:{" "}
            <time dateTime={diff.toISO()}>{diff.negate().toHuman()}</time>
          </aside>
        )}
      </div>

      <LoremIpsum count={2} />
    </div>
  );
};

export default new Hono().all("/", (c) => c.render(<Landing />, { title: 'FFFF', icon: '☝️' }));
