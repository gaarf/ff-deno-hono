import { mountables, type Mountable } from "@/client/mountables.ts";
import { render } from "hono/jsx/dom";

export default function mount(opts: Record<string, Mountable>) {
  console.time("mount");
  Object.entries(opts).forEach(([where, what]) => {
    console.log(where, what);

    const Component = mountables[what];
    const root = document.querySelector<HTMLElement>(where);

    if (root && Component) {
      render(Component({}), root);
    }
  });
  console.timeEnd("mount");
}
