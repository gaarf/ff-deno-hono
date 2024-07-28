import { type PropsWithChildren } from "hono/jsx";
import { DateTime } from "@/util.ts";
import { LoremIpsum } from "@/components/LoremIpsum.tsx";

export const Landing = ({ children }: PropsWithChildren) => {
  const uptime = DateTime.fromHTTP(String(children));

  return (
    <>
      <p class="bg-blue-100">Landing fragment</p>
      <LoremIpsum />
      {uptime.isValid && (
        <aside>
          uptime:{" "}
          <time datetime={uptime.toISO()}>
            {uptime.diffNow("seconds").negate().toHuman()}
          </time>
        </aside>
      )}
    </>
  );
};
