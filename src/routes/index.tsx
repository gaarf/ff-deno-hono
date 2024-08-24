import { Hono } from "hono";

export default new Hono().all("/", (c) => {
  return c.redirect('/blog');
});
