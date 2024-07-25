import { Hono, nestedLayout } from "@/util.ts";
import { LoremIpsum } from "@/components/LoremIpsum.tsx";

export default new Hono()
  .use(nestedLayout(LoremIpsum))
  .get('/', c => c.render(<strong>bar</strong>));

