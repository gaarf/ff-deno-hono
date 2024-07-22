import { Hono } from "@/util.ts";
import { LoremIpsum } from "@/components/LoremIpsum.tsx";

export default new Hono()
  .get('/', c => c.render(<LoremIpsum />));

