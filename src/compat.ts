import React from "@/client/react.shim.ts";

// after gen-client, HonoJsx is mapped to React
import HonoJsx from "hono/jsx";

const { createElement, forwardRef, useState, useCallback } = (
  globalThis.Deno ? HonoJsx : React
) as typeof HonoJsx;

export { createElement, forwardRef, useState, useCallback };
