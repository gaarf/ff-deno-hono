export { Hono } from "hono";
export { type PropsWithChildren, type FC } from "hono/jsx";
export * from "@/layout/middleware.tsx";
export { useUrl } from "@/layout/context.ts";

// @deno-types="npm:@types/luxon"
import { DateTime } from "luxon";
export { DateTime };

let dev = false;
DEV: {
  dev = true;
  break DEV;
}
export const isDev = () => dev;

export const isoNow = () => DateTime.now().toUTC().toISO();
export const httpNow = () => DateTime.now().toHTTP();

import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};


