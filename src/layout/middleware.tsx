import { createMiddleware } from "hono/factory";
import { jsxRenderer } from "hono/jsx-renderer";
import { mountables } from "@/client/mountables.ts";
import { Client } from "@/layout/Client.tsx";
import Document from "@/layout/Document.tsx";
import type { FC } from "hono/jsx";
import LayoutContext from "@/layout/context.ts";

export const documentLayout = createMiddleware((c, next) => {
  const url = new URL(c.req.url);

  c.setLayout(({ Layout: _, ...props }) => (
    <LayoutContext.Provider value={{ ...props, url }}>
      <Document {...props} />
    </LayoutContext.Provider>
  ));

  return next();
});

export function nestedLayout(Component: FC) {
  return jsxRenderer(({ Layout, children, ...props }) => (
    <Layout {...props}>
      <Component>{children}</Component>
    </Layout>
  ));
}

export function clientMount(Component: FC, where = "main") {
  const [what] = Object.entries(mountables).find(
    ([_, Mountable]) => Component === Mountable
  )!;
  return nestedLayout(({ children }) => (
    <>
      {children}
      <Client run="mount" opts={{ [where]: what }} />
    </>
  ));
}
