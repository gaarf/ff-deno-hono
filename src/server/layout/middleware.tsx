import { reactRenderer } from "@hono/react-renderer";
import { mountableName } from "@/client/islands/index.ts";
import { ClientRun } from "@/server/ClientRun.tsx";
import { Document } from "@/server/layout/Document.tsx";
import type { ComponentType, PropsWithChildren } from "@/utils.ts";

export const layoutRenderer = reactRenderer(
  (props: PropsWithChildren) => <Document {...props} />,
  {
    docType: true,
  },
);

export function nestedLayout<T extends React.JSX.IntrinsicAttributes>(
  Nested: (p: PropsWithChildren<T>) => React.ReactNode,
  nestedProps: T = {} as T,
) {
  return reactRenderer(
    ({
      children,
      Layout,
      ...props
    }: PropsWithChildren<{
      Layout: typeof Document;
    }>) => {
      return (
        <Layout {...props}>
          <Nested {...nestedProps}>{children}</Nested>
        </Layout>
      );
    },
  );
}

export function clientMount<T>(
  Component: ComponentType<T>,
  componentProps?: T,
  where = "main",
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

import { type RendererProps } from "@/server/layout/SsrContext.ts";

declare module "@hono/react-renderer" {
  interface Props extends RendererProps {}
}
