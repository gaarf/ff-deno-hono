import { Hono } from "@/util.ts";
import { nestedLayout } from "@/layout/middleware.tsx";
import { BarLayout } from "@/routes/bar/BarLayout.tsx";
import { Link } from "@/components/Link.tsx";
import { LoremIpsum } from "@/components/LoremIpsum.tsx";

export default new Hono()
  .use(nestedLayout(BarLayout))
  .get("/", (c) =>
    c.render(<Link href="/bar/baz">baz</Link>, { title: "barrr" })
  )
  .get("/baz", (c) =>
    c.render(
      <>
        nested in bar <LoremIpsum />
      </>,
      { title: "baz!" }
    )
  );
