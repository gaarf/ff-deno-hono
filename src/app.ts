import { Hono, httpNow, isoNow } from "@/util.ts";
import { createMiddleware } from "hono/factory";
import { poweredBy } from "hono/powered-by";
import { logger } from "hono/logger";
import { etag } from "hono/etag";
import { showRoutes } from "hono/dev";
import { timing } from "hono/timing";
import { jsxRenderer } from "hono/jsx-renderer";
import Layout, { nested } from "@/Layout.tsx";
import routes from "../.generated/routes.ts";
import styles, { cssMap } from "../.generated/styles.ts";
import client, { jsMap } from "../.generated/client.ts";
import { Landing } from "@/fragments/Landing.tsx";

const app = new Hono();
const bootTime = httpNow();

app.use(timing(), logger(), poweredBy(), jsxRenderer(Layout));

const cache = [
  etag(),
  createMiddleware(async (c, next) => {
    await next();
    c.header("Last-Modified", bootTime);
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

app.all("/", nested(Landing, { title: "home" }), (c) => c.render(isoNow()));

Object.entries(routes).forEach(([path, route]) => {
  app.route(path, route);
});

showRoutes(app);

export default app;
