import { Hono } from "hono";
import { LoremIpsum as LoremRenamed } from "@/components/LoremIpsum.tsx";
import { clientMount } from "@/layout/middleware.tsx";

export default new Hono()
  .use(clientMount(LoremRenamed, { count: 2 }, "#lorem"))
  .get("/", (c) =>
    c.render(
      <>
        <h1 class="text-5xl">foo on the server!</h1>
        <div id="lorem" />
      </>,
      { title: "foo!" }
    )
  );
