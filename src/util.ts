import { type DocumentProps } from "@/layout/Document.tsx";

declare module "hono" {
  interface ContextRenderer {
    (content: string | Promise<string>, props?: DocumentProps): Response;
  }
}

export { Hono } from "hono";

import { type PropsWithChildren, type FC } from "hono/jsx";
import { type JSX } from "hono/jsx/jsx-runtime";

export { FC, PropsWithChildren };
export type ComponentType<T> = (props: PropsWithChildren<T>) => JSX.Element;

// @deno-types="npm:@types/luxon"
import { DateTime } from "luxon";
export { DateTime };
export const isoNow = () => DateTime.now().toUTC().toISO();
export const httpNow = () => DateTime.now().toHTTP();

let dev = false;
DEV: {
  dev = true;
  break DEV;
}
export const isDev = () => dev;
export const isBrowser = () => "document" in globalThis;

import { useLayoutContext } from "@/layout/context.ts";

export const useUrl = () =>
  isBrowser() ? new URL(location.href) : useLayoutContext().url!;
export const usePathname = () => useUrl().pathname;

import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
