/// <reference lib="dom" />
import { mountables, type Mountable } from "@/client/mountables.ts";
import { render } from "hono/jsx/dom";

export default function mount(opts: Record<string, [Mountable, Record<string, unknown>]>) {
  console.group("mount");
  Object.entries(opts).forEach(([where, [what, props = {}]]) => {
    console.time(what);

    const Component = mountables[what];
    const root = document.querySelector<HTMLElement>(where);

    if (root && Component) {
      console.log(what, props);
      render(Component(props), root);
      console.log(root.childNodes);
    }
    else {
      console.error(where);
    }

    console.timeEnd(what);
  });
  console.groupEnd();

  return Promise.resolve();
}
