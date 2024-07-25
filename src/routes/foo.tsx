import { Hono } from "@/util.ts";

export default new Hono()
  .get('/', c => c.render('here be the foo page'));

