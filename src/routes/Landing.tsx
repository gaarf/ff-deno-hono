import { type PropsWithChildren } from "hono/jsx";
import { DateTime } from "@/util.ts";
import { LoremIpsum } from "@/components/LoremIpsum.tsx";

export const Landing = ({ children }: PropsWithChildren) => {
  const uptime = DateTime.fromHTTP(String(children));

  return (
    <>
      <p class="bg-blue-100 rounded p-2 mb-2">Landing layout</p>

      {uptime.isValid && (
        <aside>
          server uptime:{" "}
          <time datetime={uptime.toISO()}>
            {uptime.diffNow("seconds").negate().toHuman()}
          </time>
        </aside>
      )}
      <LoremIpsum />
    </>
  );
};
