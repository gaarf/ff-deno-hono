import { Hono } from "hono";
import { nestedLayout } from "@/server/layout/middleware.tsx";
import { BarLayout } from "@/server/routes/bar/BarLayout.tsx";
import { Link } from "@/components";
import { Test } from "@/components/Test.tsx";

export default new Hono()
  .use(nestedLayout(BarLayout))
  .get(
    "/",
    (c) => c.render(<Link href="/bar/baz">baz</Link>, { title: "barrr" }),
  )
  .get(
    "/baz",
    nestedLayout(Test),
    (c) => c.render("baz in bar", { title: "baz!", icon: "😃" }),
  );
