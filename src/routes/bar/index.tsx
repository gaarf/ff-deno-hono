import { Hono, layoutProps } from "@/util.ts";
import { LoremIpsum } from "@/components/LoremIpsum.tsx";

export default new Hono()
  .use(layoutProps({ title: 'Bar!' }))
  .get('/', c => c.render(<LoremIpsum count={100} />));

