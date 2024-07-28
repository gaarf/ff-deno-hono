import { Hono } from "@/util.ts";
import { LoremIpsum as LoremRenamed } from "@/components/LoremIpsum.tsx";
import { clientMount } from "@/layout/middleware.tsx";

export default new Hono()
  .use(clientMount(LoremRenamed))
  .get("/", (c) => c.render("this is foo!!!!", { title: "foo " }));
