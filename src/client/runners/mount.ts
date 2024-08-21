import React, { createElement } from "@/react.shim.ts";
// @ts-types="npm:@types/react-dom/client"
import { createRoot } from "react-dom/client";
import { mountables, type MountableName } from "@/client/islands/index.ts";
import { Providers } from "@/Providers.tsx";

export default function mount(
  opts: Record<string, [MountableName, Record<string, unknown>]>,
) {
  console.group("mount");
  Object.entries(opts).forEach(([where, [what, props]]) => {
    console.time(what);

    const Component = mountables[what];
    const el = document.querySelector<HTMLElement>(where);

    if (el && Component) {
      createRoot(el).render(
        createElement(
          Providers,
          props,
          createElement(Component as React.FC, props),
        ),
      );
      console.log(el);
    } else {
      console.error(where);
    }

    console.timeEnd(what);
  });
  console.groupEnd();

  return Promise.resolve();
}
