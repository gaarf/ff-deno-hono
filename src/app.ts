import { Hono } from "hono";
import { httpNow } from "@/utils.ts";

import { layoutRenderer } from "@/server/middleware.tsx";
import staticAssets from "@/server/static.ts";

import routes from "_generated/routes.ts";
import { Theme, validThemes } from "@/theme/index.ts";
import { getCookie } from "hono/cookie";
import { middleware as supabase } from "@/supabase/server.ts";

const app = new Hono();
const bootTime = httpNow();

let dev = false;
DEV: {
  dev = true;
  const [{ timing }, { logger }] = await Promise.all([
    import("hono/timing"),
    import("hono/logger"),
  ]);
  app.use(timing(), logger());
  break DEV;
}

staticAssets(app, bootTime);

app.use((c, next) => {
  c.set("dev", dev);
  let theme = getCookie(c, "theme") as Theme;
  if (!validThemes.includes(theme)) {
    theme = "dark";
  }
  c.set("theme", theme);
  return next();
});

app.use(supabase, layoutRenderer);

Object.entries(routes).forEach(([path, route]) => {
  app.route(path, route);
});

DEV: {
  const { showRoutes } = await import("hono/dev");
  showRoutes(app);
  break DEV;
}

export default app;
