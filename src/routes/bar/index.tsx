import { Hono, nestedLayout } from "@/util.ts";
import { BarLayout } from "@/routes/bar/BarLayout.tsx";
import { Link } from "@/components/Link.tsx";

export default new Hono()
  .use(nestedLayout(BarLayout))
  .get('/', c => c.render(<Link href="/bar/baz">baz</Link>, { title: 'barrr'}))
  .get('/baz', c => c.render('nested in bar layout', { title: 'baz!'}));

