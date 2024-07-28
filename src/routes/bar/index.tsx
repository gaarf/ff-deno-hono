import { Hono, nestedLayout } from "@/util.ts";
import { LoremIpsum } from "@/components/LoremIpsum.tsx";
import { BarLayout } from "@/routes/bar/BarLayout.tsx";

export default new Hono()
  .use(nestedLayout(BarLayout))
  .get('/', c => c.render(<LoremIpsum count={10} />, { title: 'barrr'}))
  .get('/baz',  c => c.render('nested in bar layout', { title: 'baz!'}));

