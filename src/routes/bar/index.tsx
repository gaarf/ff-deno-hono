import { Hono, nestedLayout } from "@/util.ts";
import { BarLayout } from "@/routes/bar/BarLayout.tsx";

export default new Hono()
  .use(nestedLayout(BarLayout))
  .get('/', c => c.render(<a href="/bar/baz">baz</a>, { title: 'barrr'}))
  .get('/baz', c => c.render('nested in bar layout', { title: 'baz!'}));

