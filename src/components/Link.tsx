import { cn, PropsWithChildren } from "@/util.ts";
import { type JSX } from "hono/jsx/jsx-runtime";
import { forwardRef } from "hono/jsx";

type LinkProps = PropsWithChildren<JSX.IntrinsicElements["a"]>;

export const Link = forwardRef<HTMLAnchorElement>(
  ({ children, ...props }: LinkProps, ref) => {
    return (
      <a {...props} class={cn("underline", props.class)} ref={ref}>
        {children}
      </a>
    );
  }
);
