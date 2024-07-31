import { etag } from "hono/etag";
import { createMiddleware } from "hono/factory";
import styles, { cssMap } from "../.generated/styles.ts";
import client, { jsMap } from "../.generated/client.ts";
import { type Hono } from "hono";

export default function(app: Hono, bootTime: string) {

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
}
