import { isBrowser } from "@/client/browser.ts";
import { cn, type ComponentType, type JSX } from "@/utils.ts";
import React from "@/client/react.shim.ts";

// after gen-client, HonoJsx is mapped to React
import HonoJsx from "hono/jsx";

const { createElement, forwardRef, useState, useCallback } = (
  isBrowser() ? React : HonoJsx
) as typeof HonoJsx;

export { useCallback, useState };

export function intrinsic<T extends keyof JSX.IntrinsicElements>(
  tag: T,
  baseProps?: JSX.IntrinsicElements[T]
): ComponentType<JSX.IntrinsicElements[T]> {
  // @ts-expect-error: JSXNode ¯\_(ツ)_/¯ JSX.Element
  return forwardRef<unknown, typeof baseProps>((props, ref) => {
    const newProps = {
      ...baseProps,
      ...props,
      ref,
      className: cn(baseProps?.className, props?.className),
    };
    return createElement(String(tag), newProps, props?.children as string);
  });
}