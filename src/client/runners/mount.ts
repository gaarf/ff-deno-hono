import React from "@/client/react.shim.ts";
// @deno-types="npm:@types/react-dom/client"
import { createRoot } from "react-dom/client";
import { mountables, type NamedMountable } from "@/client/islands/index.ts";

export default function mount(
  opts: Record<string, [NamedMountable, Record<string, unknown>]>
) {
  console.group("mount");
  Object.entries(opts).forEach(([where, [what, props]]) => {
    console.time(what);

    const Component = mountables[what];
    const el = document.querySelector<HTMLElement>(where);

    if (el && Component) {
      createRoot(el).render(React.createElement(Component as React.FC, props));
      console.log(el);
    } else {
      console.error(where);
    }

    console.timeEnd(what);
  });
  console.groupEnd();

  return Promise.resolve();
}
