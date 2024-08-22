import { DateTime, type PropsWithChildren } from "@/utils.ts";
import { type DurationUnits } from "npm:@types/luxon";

type TimeAgoProps = PropsWithChildren<{
  when?: string;
  className?: string;
  unit?: DurationUnits;
  options?: Intl.NumberFormatOptions;
}>;

export const TimeAgo = ({
  when = DateTime.now().toISO(),
  children,
  unit,
  options = { unitDisplay: "narrow", useGrouping: true },
  className,
}: TimeAgoProps) => {
  return (
    <time dateTime={when} className={className}>
      {DateTime.fromISO(when).diffNow(unit).negate().toHuman(options)}
      {children || " ago"}
    </time>
  );
};
