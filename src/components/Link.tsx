import { cn, forwardRef, type JSX, type PropsWithChildren } from "@/utils.ts";

type LinkProps = PropsWithChildren<JSX.IntrinsicElements["a"]>;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, ...props }, ref) => {
    return (
      <a {...props} class={cn("underline", props.class)} ref={ref}>
        {children}
      </a>
    );
  }
);
