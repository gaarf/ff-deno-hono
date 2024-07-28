import { createMiddleware } from "hono/factory";
import { jsxRenderer } from "hono/jsx-renderer";
import { mountables } from "@/client/mountables.ts";
import { Client } from "@/components/Client.tsx";
import Document from "@/layout/Document.tsx";
import type { FC } from "hono/jsx";

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

export const documentLayout = createMiddleware((c, next) => {
  // const url = new URL(c.req.url);

  c.setLayout(Document);

  return next();
});
