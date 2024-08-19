export * from "@/react.shim.ts";

// @ts-types="npm:@types/luxon"
import { DateTime } from "luxon";
export { DateTime };
export const isoNow = () => DateTime.now().toUTC().toISO();
export const httpNow = () => DateTime.now().toHTTP();

import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export * from "@/client/browser.ts";
export { default as clientOnly } from "@/client/only.tsx";
// export { toast } from "react-hot-toast";
