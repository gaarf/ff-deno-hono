import { cn, ComponentType, forwardRef, type JSX } from "@/utils.ts";
import { createElement } from "hono/jsx";

function intrinsic<T extends keyof JSX.IntrinsicElements>(
  tag: T,
  baseProps?: JSX.IntrinsicElements[T]
): ComponentType<JSX.IntrinsicElements[T]> {
  return forwardRef(
    ({ children, ...props }, ref) =>
      createElement(
        String(tag),
        {
          ...baseProps,
          ...props,
          ref,
          class: cn(baseProps?.class, props.class),
        },
        children as string
      ) as unknown as JSX.Element
  );
}

export const Button = intrinsic("button", {
  class: "border hover:border-orange-500 bg-blue-300 rounded-lg py-1 px-2",
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
