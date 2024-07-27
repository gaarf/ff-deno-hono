import { Hono, httpNow, nestedLayout } from "@/util.ts";
import { createMiddleware } from "hono/factory";
import { etag } from "hono/etag";
import { jsxRenderer } from "hono/jsx-renderer";
import Layout from "@/Layout.tsx";
import routes from "../.generated/routes.ts";
import styles, { cssMap } from "../.generated/styles.ts";
import client, { jsMap } from "../.generated/client.ts";
import { Landing } from "@/fragments/Landing.tsx";

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

app.use(jsxRenderer(Layout));

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

app.get("/health", (c) => c.text("OK!"));

app.all("/", nestedLayout(Landing, { title: "home" }), (c) => c.render(bootTime));

Object.entries(routes).forEach(([path, route]) => {
  app.route(path, route);
});

DEV: {
  const { showRoutes } = await import("hono/dev");
  showRoutes(app, { colorize: false });
  break DEV;
}

export default app;
