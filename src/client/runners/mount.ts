import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { mountables, type Mountable } from "@/client/islands/index.ts";

export default function mount(
  opts: Record<string, [Mountable, Record<string, unknown>]>
) {
  console.group("mount");
  Object.entries(opts).forEach(([where, [what, props]]) => {
    console.time(what);

    const Component = mountables[what];
    const root = document.querySelector<HTMLElement>(where);

    if (root && Component) {
      createRoot(root).render(createElement(Component, props));
      console.log(root);
    } else {
      console.error(where);
    }

    console.timeEnd(what);
  });
  console.groupEnd();

  return Promise.resolve();
}
