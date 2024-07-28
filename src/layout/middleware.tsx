import { jsxRenderer } from "hono/jsx-renderer";
import { mountables } from "@/client/mountables.ts";
import { Client } from "@/components/Client.tsx";
import type { FC } from "hono/jsx";

export function nestedLayout(Component: FC) {
  return jsxRenderer(({ Layout, children }) => (
    <Layout>
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
