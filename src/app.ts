import { Hono } from "hono";
import { httpNow } from "@/utils.ts";

import { layoutRenderer, nestedLayout } from "@/server/middleware.tsx";
import { Landing } from "@/server/routes/Landing.tsx";
import staticAssets from "@/server/static.ts";

import routes from "_generated/routes.ts";
import { Theme, validThemes } from "@/theme/index.ts";
import { getCookie } from "hono/cookie";
import { createClient } from "@/supabase/server.ts";

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

app.use((c, next) => {
  c.set("dev", dev);
  let theme = getCookie(c, "theme") as Theme;
  if (!validThemes.includes(theme)) {
    theme = "dark";
  }
  c.set("theme", theme);

  c.set("supabase", createClient(c));

  return next();
});

staticAssets(app, bootTime);

app.use(layoutRenderer);

app.all("/", nestedLayout(Landing), (c) => c.render(bootTime, { icon: "🚀" }));

Object.entries(routes).forEach(([path, route]) => {
  app.route(path, route);
});

DEV: {
  const { showRoutes } = await import("hono/dev");
  showRoutes(app);
  break DEV;
}

export default app;
