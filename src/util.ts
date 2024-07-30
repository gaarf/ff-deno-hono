export { type FC, createContext } from "hono/jsx";
import { type PropsWithChildren } from "hono/jsx";
import { type JSX } from "hono/jsx/jsx-runtime";

export { PropsWithChildren };
export type ComponentType<T> = (props: PropsWithChildren<T>) => JSX.Element;

// @deno-types="npm:@types/luxon"
import { DateTime } from "luxon";
export { DateTime };
export const isoNow = () => DateTime.now().toUTC().toISO();
export const httpNow = () => DateTime.now().toHTTP();
export const isBrowser = () => "document" in globalThis;

import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
