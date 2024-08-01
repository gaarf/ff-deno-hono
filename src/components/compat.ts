import { isBrowser } from "@/utils.ts";

// @deno-types="npm:@types/react"
import React from "react";
import HonoJsx from "hono/jsx";

const lib = (isBrowser() ? React : HonoJsx) as typeof HonoJsx;

export const createElement = lib.createElement;
export const forwardRef = lib.forwardRef;