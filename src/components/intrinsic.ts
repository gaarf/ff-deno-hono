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
