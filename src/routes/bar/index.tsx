import { Hono } from "@/util.ts";

export default new Hono()
  // .use(nested(LoremIpsum))
  .get('/', c => c.render(<strong>bar</strong>));

