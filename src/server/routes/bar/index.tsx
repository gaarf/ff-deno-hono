import { Hono } from "hono";
import { nestedLayout, requireAuth } from "@/server/middleware.tsx";
import { BarLayout } from "@/server/routes/bar/BarLayout.tsx";
import { Link } from "@/components";
import { Test } from "@/components/Test.tsx";

export default new Hono()
  .use(nestedLayout(BarLayout))
  .get("/", (c) =>
    c.render(<p>
      <Link href="/bar/baz">baz</Link>{", "}
      <Link href="/bar/secret">secret</Link>
    </p>, { title: "barrr" })
  )
  .get("/secret", requireAuth, (c) => c.render("secret area"))
  .get("/baz", nestedLayout(Test), (c) =>
    c.render("baz in bar", { title: "baz!", icon: "😃" })
  );
