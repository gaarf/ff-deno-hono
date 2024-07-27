import { createMiddleware } from "hono/factory";
import { jsxRenderer } from "hono/jsx-renderer";
import { mountables } from "@/client/mountables.ts";
import { Client } from "@/components/Client.tsx";
import { type LayoutProps } from "@/layout/Layout.tsx";
import type { FC } from "hono/jsx";

type LayoutPropsWithoutUrl = Omit<LayoutProps, "url">;

export function nestedLayout(Component: FC, props?: LayoutPropsWithoutUrl) {
  return createMiddleware((c, next) => {
    const layoutProps = { ...props, url: new URL(c.req.url) };
    return jsxRenderer(({ Layout, children }) => (
      <Layout {...layoutProps}>
        <Component>{children}</Component>
      </Layout>
    ))(c, next);
  });
}

export const layoutProps = (props: LayoutPropsWithoutUrl) =>
  nestedLayout(({ children }) => children, props);

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
