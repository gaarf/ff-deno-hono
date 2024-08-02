import { Hono } from "hono";
import { LoremIpsum as LoremRenamed } from "../../client/islands/LoremIpsum.tsx";
import { clientMount } from "@/server/layout/middleware.tsx";
import { hybrid } from "@/client/islands/index.ts";

export default new Hono()
  .get("/", clientMount(LoremRenamed, { count: 2 }, "#lorem"), (c) =>
    c.render(
      <>
        <h1 class="text-5xl">foo on the server!</h1>
        <section class="my-5">
          <h2>client side says:</h2>
          <div id="lorem" class="border p-2">
            mount here
          </div>
        </section>
      </>,
      { title: "foo!" },
    ))
  .get("/btc", (c) => c.render(<hybrid.BtcPrice />));
