export { Hono } from "hono";
export { type PropsWithChildren, type FC } from "hono/jsx";
import { nested, type LayoutProps } from '@/Layout.tsx';

export { nested as nestedLayout };
export const layoutProps = (props: LayoutProps) => nested(({ children }) => children, props);

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


