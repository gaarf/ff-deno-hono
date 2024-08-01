import { Hono } from "hono";
import { httpNow } from "@/utils.ts";

import { documentLayout, nestedLayout } from "./server/layout/middleware.tsx";
import { Landing } from "@/server/routes/Landing.tsx";
import staticAssets from '@/static.ts';

import routes from "../.generated/routes.ts";


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
  return next();
});

staticAssets(app, bootTime);

app.use(...documentLayout);

app.all("/", nestedLayout(Landing), (c) =>
  c.render(bootTime, { icon: "🚀" })
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
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      props?: import("./server/layout/SsrContext.ts").DocumentProps
    ): Response;
  }
  interface ContextVariableMap {
    dev: boolean;
  }
}
