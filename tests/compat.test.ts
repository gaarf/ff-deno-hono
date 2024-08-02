import { assertEquals } from "std/assert/mod.ts";
import HonoJsx from "hono/jsx";

const { ...exports } = await import("@/compat.ts");
Object.entries(exports).forEach(([k, x]) => {
  Deno.test(k, () => {
    assertEquals(x, HonoJsx[k as keyof typeof HonoJsx]);
  });
});