import { createElement, forwardRef } from "@/react.shim.ts";
import { cn } from "@/utils.ts";

type Tag = keyof JSX.IntrinsicElements;
type IntrinsicProps<T extends Tag> = JSX.IntrinsicElements[T];

export function intrinsic<T extends Tag>(
  tag: T,
  baseProps?: IntrinsicProps<T>,
) {
  return forwardRef<unknown, typeof baseProps>((props, ref) => {
    const newProps = {
      ...baseProps,
      ...props,
      ref,
      className: cn(baseProps?.className, props?.className),
    };
    return createElement(String(tag), newProps, props?.children);
  });
}

export const Input = intrinsic("input", {
  className: "border rounded bg-neutral-1 p-1",
});

export const Textarea = intrinsic("textarea", {
  className: "border rounded bg-neutral-1 p-1",
});

export const Box = intrinsic("div", {
  className: "flex justify-between items-center",
});

export const Link = intrinsic("a", {
  className: "underline",
});

export const Pre = intrinsic("pre", {
  className: "bg-neutral-3 rounded overflow-auto p-2",
});
