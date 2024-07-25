export { Hono } from "hono";
export { type PropsWithChildren, type FC } from "hono/jsx";
export { nested as nestedLayout } from '@/Layout.tsx';

import { DateTime } from "luxon";
export { DateTime };

export const isoNow = () => DateTime.now().toString();
export const httpNow = () => DateTime.now().toHTTP();



