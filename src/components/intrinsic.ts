import { cn, ComponentType, forwardRef, type JSX } from "@/utils.ts";
import { createElement } from "hono/jsx";

function intrinsic<T extends keyof JSX.IntrinsicElements>(
  tag: T,
  baseProps?: JSX.IntrinsicElements[T]
): ComponentType<JSX.IntrinsicElements[T]> {
  return forwardRef(
    ({ children, ...props }, ref) =>
      // @ts-expect-error: JSXNode ¯\_(ツ)_/¯ JSX.Element
      createElement(
        String(tag),
        {
          ...baseProps,
          ...props,
          ref,
          class: cn(baseProps?.class, props.class),
        },
        children as string
      )
  );
}

export const Button = intrinsic("button", {
  class: cn(
    "border hover:border-orange-500 font-bold rounded-lg py-1 px-2 select-none",
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-forbidden",
  ),
});

export const Input = intrinsic("input", {
  class: "border",
});

export const Textarea = intrinsic("textarea", {
  class: "border",
});

export const Box = intrinsic("div", {
  class: "flex justify-between",
});
export const Link = intrinsic("a", {
  class: "underline",
});
export const Pre = intrinsic("pre", {
  class: "bg-slate-200 rounded overflow-hidden p-2 my-4",
});
