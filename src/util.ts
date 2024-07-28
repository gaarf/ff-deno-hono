export { Hono } from "hono";
export { type PropsWithChildren, type FC } from "hono/jsx";
export { useUrl } from "@/layout/context.ts";

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
export const isBrowser = () => typeof document !== "undefined";

import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));


