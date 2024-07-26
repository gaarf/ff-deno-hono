import { LoremIpsum } from "@/components/LoremIpsum.tsx";
import { render } from "hono/jsx/dom";

export default function mountMain({ now }: { now: string }) {
  console.log("client side mountMain", now);

  const Component = {
    "/foo": LoremIpsum,
  }[location.pathname];

  const main = document.querySelector("main");

  if (main && Component) {
    render(Component({}), main);
  }
}
