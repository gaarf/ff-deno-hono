import { createMiddleware } from "hono/factory";
import { jsxRenderer } from "hono/jsx-renderer";
import { mountables } from "@/client/mountables.ts";
import { Client } from "@/layout/Client.tsx";
import Document from "@/layout/Document.tsx";
import LayoutContext from "@/layout/context.ts";
import type { ComponentType, FC } from "@/util.ts";
import type { Child } from "hono/jsx";

export const documentLayout = createMiddleware((c, next) => {
  const url = new URL(c.req.url);

  c.setLayout(({ Layout: _, ...props }) => (
    <LayoutContext.Provider value={{ ...props, url }}>
      <Document {...props} />
    </LayoutContext.Provider>
  ));

  return next();
});

export function nestedLayout<T>(
  Component: ComponentType<T>,
  componentProps?: T
) {
  const FComponent = Component as FC; // fixme?
  return jsxRenderer(({ Layout, children, ...props }) => (
    <Layout {...props}>
      <FComponent {...componentProps}>{children}</FComponent>
    </Layout>
  ));
}

export function clientMount<T>(Component: FC<T>, componentProps?: T, where = "main") {
  const [what] = Object.entries(mountables).find(
    ([_, Mountable]) => Component === Mountable
  )!;
  return nestedLayout(({ children }) => (
    <>
      {children}
      <Client run="mount" opts={{ [where]: [what, componentProps ?? {}] }} />
    </>
  ));
}
