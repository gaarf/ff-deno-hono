import app from "@/app.ts";
import { Hono } from "hono";
import { assertInstanceOf } from "std/assert/mod.ts";

Deno.test("it's Hono", () => {
  assertInstanceOf(app, Hono);
});
