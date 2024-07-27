import { Hono, clientMount } from "@/util.ts";
import { LoremIpsum as LoremRenamed } from "@/components/LoremIpsum.tsx";

export default new Hono()
  .use(clientMount(LoremRenamed))
  .get('/', c => c.render('this is foo!!'));

