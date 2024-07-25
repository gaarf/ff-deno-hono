/// <reference lib="dom" />
import { LoremIpsum } from "@/components/LoremIpsum.tsx";
import { render } from "hono/jsx/dom";


const MainComponent = {
  '/foo': LoremIpsum
}[location.pathname];

const main = document.querySelector("main");

if(main && MainComponent) {
  render(<MainComponent />, main);
}

