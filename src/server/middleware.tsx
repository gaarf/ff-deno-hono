import { reactRenderer } from "@/server/renderer.ts";
import { mountableName } from "@/client/islands/index.ts";
import { ClientRun } from "@/server/Hybrid.tsx";
import { Document } from "@/server/layout/Document.tsx";
import type { ComponentType, PropsWithChildren } from "@/utils.ts";
import { createMiddleware } from "hono/factory";

export const layoutRenderer = reactRenderer(
  ({ c: _c, ...props }) => <Document {...props} />,
  {
    docType: true,
  }
);

export function nestedLayout<T extends React.JSX.IntrinsicAttributes>(
  Nested: (p: PropsWithChildren<T>) => React.ReactNode,
  nestedProps: T = {} as T
) {
  return reactRenderer(({ children, Layout, ...props }) => {
    return (
      <Layout {...props}>
        <Nested {...nestedProps}>{children}</Nested>
      </Layout>
    );
  });
}

export function clientMount<T>(
  Component: ComponentType<T>,
  componentProps?: T,
  where = "main"
) {
  const what = mountableName(Component);
  function Mount({ children }: PropsWithChildren) {
    return (
      <>
        {children}
        <ClientRun
          name="mount"
          opts={{ [where]: [what, componentProps ?? {}] }}
        />
      </>
    );
  }
  return nestedLayout(Mount);
}

export const requireAuth = createMiddleware(async (c, next) => {
  const {
    data: { user },
  } = await c.get('db').auth.getUser();
  c.set("user", user);
  if (!user) {
    return c.redirect("/login");
  } 
  await next();
});
