import { Hono } from "hono";
import { LoremIpsum as LoremRenamed } from "@/islands/LoremIpsum.tsx";
import { clientMount } from "@/layout/middleware.tsx";

export default new Hono()
  .use(clientMount(LoremRenamed, { count: 2 }, "#lorem"))
  .get("/", (c) =>
    c.render(
      <>
        <h1 class="text-5xl">foo on the server!</h1>
        <section class="my-5">
          <h2>client side says:</h2>
          <div id="lorem" class="border p-2">mount here</div>
        </section>
      </>,
      { title: "foo!" }
    )
  );
