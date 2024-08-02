import { assertEquals } from "std/assert/mod.ts";
import HonoJsx from "hono/jsx";
import { useCallback, useState } from "@/client/compat.ts";

Deno.test('hooks are from hono', () => {
  assertEquals(useCallback, HonoJsx.useCallback);
  assertEquals(useState, HonoJsx.useState);
});

Deno.test('intrisic', () => {
  // assertEquals(useCallback, HonoJsx.useCallback);
  // assertEquals(useState, HonoJsx.useState);
});
