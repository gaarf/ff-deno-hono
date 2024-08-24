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

const inputKlass = "border rounded bg-default-bg p-1 shadow-inner";

export const Input = intrinsic("input", {
  className: inputKlass,
});

export const Textarea = intrinsic("textarea", {
  className: cn(inputKlass, "font-mono"),
});

export const Box = intrinsic("div", {
  className: "flex justify-between items-center",
});

export const Link = intrinsic("a", {
  className: "underline",
});

export const Pre = intrinsic("pre", {
  className: "bg-neutral-1 rounded overflow-auto p-2",
});

export const Code = intrinsic("code", {
  className:
    "bg-neutral-1 border border-neutral-5 font-mono text-xs rounded p-1 break-all",
});
