import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { Theme, validThemes } from "@/theme/index.ts";

export const middleware = () => createMiddleware((c, next) => {
  let theme = getCookie(c, "theme") as Theme;
  if (!validThemes.includes(theme)) {
    theme = "dark";
  }
  c.set("theme", theme);
  return next();
});

import {} from "hono";
declare module "hono" {
  interface ContextVariableMap {
    theme: Theme;
  }
}
