import { DateTime, type PropsWithChildren } from "@/util.ts";
import { LoremIpsum } from "@/components/LoremIpsum.tsx";

export const Landing = ({ children }: PropsWithChildren) => {
  const uptime = DateTime.fromHTTP(String(children));
  const diff = uptime.diffNow();

  return (
    <>
      <p class="bg-blue-100 rounded p-2 mb-2">Landing layout</p>

      {diff.isValid && (
        <aside>
          server uptime:{" "}
          <time datetime={diff.toISO()}>
            {diff.negate().toHuman()}
          </time>
        </aside>
      )}
      <LoremIpsum />
    </>
  );
};