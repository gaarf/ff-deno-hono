import { DateTime, type PropsWithChildren } from "@/utils.ts";
import { type DurationUnits } from "npm:@types/luxon";

type TimeAgoProps = PropsWithChildren<{
  when?: string;
  className?: string;
  unit?: DurationUnits;
}>;

export const TimeAgo = ({
  when = DateTime.now().toISO(),
  children,
  unit,
  className,
}: TimeAgoProps) => {
  return (
    <time dateTime={when} className={className}>
      {DateTime.fromISO(when)
        .diffNow(unit)
        .negate()
        .toHuman({ unitDisplay: "narrow" })}
      {children || " ago"}
    </time>
  );
};
