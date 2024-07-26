export { Hono } from "hono";
export { type PropsWithChildren, type FC } from "hono/jsx";
export { nested as nestedLayout, clientMount, layoutProps } from '@/Layout.tsx';

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


