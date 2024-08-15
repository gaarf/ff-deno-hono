import { Pre } from "@/components";
import { JSX } from "@/react.shim.ts";
import { cn } from "@/utils.ts";

type JsonProps = {
  value: unknown;
} & JSX.IntrinsicElements["pre"];

export const Json = ({ value, ...props }: JsonProps) => (
  <Pre
    {...props}
    className={cn("break-all whitespace-pre-wrap text-sm", props.className)}
  >
    {JSON.stringify(value, null, 2)}
  </Pre>
);
