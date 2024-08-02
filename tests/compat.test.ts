import { assertEquals } from "std/assert/mod.ts";
import HonoJsx from "hono/jsx";

Deno.test("react/hono compatibility shim", async () => {
  const { createElement } = await import("@/compat.ts");
  assertEquals(createElement, HonoJsx.createElement);
});
