import { Hono } from "@/util.ts";
import { LoremIpsum as LoremRenamed } from "@/components/LoremIpsum.tsx";
import { clientMount } from "@/layout/middleware.tsx";

export default new Hono()
  .use(clientMount(LoremRenamed, { count: 2 }, "#lorem"))
  .get("/", (c) =>
    c.render(
      <>
        <h1 class="text-5xl">this is foo!!!!</h1>
        <div id="lorem" />
      </>,
      { title: "foo!" }
    )
  );
