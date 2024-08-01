import { cn, type ComponentType, type JSX } from "@/utils.ts";
import { forwardRef, createElement } from "@/components/compat.ts";

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
          className: cn(baseProps?.className, props.className),
        },
        children as string
      )
  );
}

export const Button = intrinsic("button", {
  className: cn(
    "border hover:border-orange-500 font-bold rounded-lg py-1 px-2 select-none",
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-forbidden",
  ),
});

export const Input = intrinsic("input", {
  className: "border",
});

export const Textarea = intrinsic("textarea", {
  className: "border",
});

export const Box = intrinsic("div", {
  className: "flex justify-between",
});
export const Link = intrinsic("a", {
  className: "underline",
});
export const Pre = intrinsic("pre", {
  className: "bg-slate-200 rounded overflow-hidden p-2 my-4",
});
