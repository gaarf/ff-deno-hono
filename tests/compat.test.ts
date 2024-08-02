import { assertEquals } from "std/assert/mod.ts";
import HonoJsx from "hono/jsx";
import * as compatExports from "@/compat.ts";

Object.entries(compatExports).forEach(([k, x]) => {
  Deno.test(k, () => {
    assertEquals(x, HonoJsx[k as keyof typeof HonoJsx]);
  });
});
