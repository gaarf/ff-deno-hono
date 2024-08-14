import { Hono } from "hono";
import { httpNow } from "@/utils.ts";
import staticAssets from "@/server/static.ts";
import routes from "_generated/routes.ts";
import { middleware as theme } from "@/theme/server.ts";
import { middleware as supabase } from "@/supabase/server.ts";
import { layoutRenderer } from "@/server/middleware.tsx";

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

app.use(
  (c, next) => {
    c.set("dev", dev);
    return next();
  },
  theme,
  supabase,
  layoutRenderer,
);

Object.entries(routes).forEach(([path, route]) => {
  app.route(path, route);
});

DEV: {
  const { showRoutes } = await import("hono/dev");
  showRoutes(app);
  break DEV;
}

export default app;

declare module "hono" {
  interface ContextVariableMap {
    dev: boolean;
  }
}
