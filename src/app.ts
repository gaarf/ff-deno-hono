import { Hono } from "hono";
import { httpNow } from "@/utils.ts";

import { documentLayout, nestedLayout } from "@/layout/middleware.tsx";
import { Landing } from "@/routes/Landing.tsx";

import { etag } from "hono/etag";
import { createMiddleware } from "hono/factory";

import routes from "../.generated/routes.ts";
import styles, { cssMap } from "../.generated/styles.ts";
import client, { jsMap } from "../.generated/client.ts";

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

const cache = [
  etag(),
  createMiddleware((c, next) => {
    c.header("Last-Modified", bootTime);
    return next();
  }),
];

app.get("/client.*", ...cache, (c) => {
  switch (c.req.path.substring(8)) {
    case "js":
      c.header("Content-Type", "text/javascript");
      return c.body(client);
    case "js.map":
      if (jsMap) {
        return c.json(jsMap);
      }
    /* falls through */
    default:
      return c.notFound();
  }
});

app.get("/styles.*", ...cache, (c) => {
  switch (c.req.path.substring(8)) {
    case "css":
      c.header("Content-Type", "text/css");
      return c.body(styles);
    case "css.map":
      if (cssMap) {
        return c.json(cssMap);
      }
    /* falls through */
    default:
      return c.notFound();
  }
});

app.use(documentLayout);

app.all("/", nestedLayout(Landing), (c) =>
  c.render(bootTime, { title: "Homepage" })
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
      props?: import("@/layout/SsrContext.ts").DocumentProps
    ): Response;
  }
  interface ContextVariableMap {
    dev: boolean;
  }
}
