import { Pre } from "@/components";
import { JSX } from "@/utils.ts";

type JsonProps = {
  value: unknown;
} & JSX.IntrinsicElements["pre"];

export const Json = ({ value, ...props }: JsonProps) => (
  <Pre {...props}>{JSON.stringify(value, null, 2)}</Pre>
);
