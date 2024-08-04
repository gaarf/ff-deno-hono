import { DateTime, type PropsWithChildren } from "@/utils.ts";
import { LoremIpsum } from "@/client/islands/LoremIpsum.tsx";

export const Landing = ({ children }: PropsWithChildren) => {
  const uptime = DateTime.fromHTTP(String(children));
  const diff = uptime.diffNow();

  return (
    <>
      <p className="bg-blue-100 rounded p-2 mb-2">Landing layout</p>

      {diff.isValid && (
        <aside>
          server uptime:{" "}
          <time dateTime={diff.toISO()}>
            {diff.negate().toHuman()}
          </time>
        </aside>
      )}
      <LoremIpsum />
    </>
  );
};
