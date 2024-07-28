
import { Hono, httpNow } from "@/util.ts";
import { documentLayout, nestedLayout } from "@/layout/middleware.tsx";
import { Landing } from "@/fragments/Landing.tsx";

import { etag } from "hono/etag";
import { createMiddleware } from "hono/factory";

import routes from "../.generated/routes.ts";
import styles, { cssMap } from "../.generated/styles.ts";
import client, { jsMap } from "../.generated/client.ts";

const app = new Hono();
const bootTime = httpNow();

DEV: {
  const [{ timing }, { logger }] = await Promise.all([
    import("hono/timing"),
    import("hono/logger"),
  ]);
  app.use(timing(), logger());
  break DEV;
}

app.use(documentLayout);

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
      return c.json(jsMap);
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
      return c.json(cssMap);
    default:
      return c.notFound();
  }
});

app.get("/health", (c) => c.text("OK!"));

app.all("/", nestedLayout(Landing), (c) =>
  c.render(bootTime, { title: 'Homepage' })
);

Object.entries(routes).forEach(([path, route]) => {
  app.route(path, route);
});

DEV: {
  const { showRoutes } = await import("hono/dev");
  showRoutes(app, { colorize: false });
  break DEV;
}

export default app;
