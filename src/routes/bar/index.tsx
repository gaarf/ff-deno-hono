import { Hono } from "hono";
import { nestedLayout } from "@/layout/middleware.tsx";
import { BarLayout } from "@/routes/bar/BarLayout.tsx";
import { Link } from "@/components/intrinsic.ts";
import { BtcPrice } from "@/islands/BtcPrice.tsx";
import { withHybrid } from "@/client/Hybrid.tsx";

const HybridBtc = withHybrid(BtcPrice);

export default new Hono()
  .use(nestedLayout(BarLayout))
  .get("/", (c) =>
    c.render(<Link href="/bar/baz">baz</Link>, { title: "barrr" })
  )
  .get(
    "/baz",
    nestedLayout(HybridBtc),
    (c) => c.render('baz in bar', { title: "baz!", icon: '😃' })
  );
