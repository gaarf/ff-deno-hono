import { type PropsWithChildren, type FC, isoNow, isDev } from "@/util.ts";
import { jsxRenderer } from "hono/jsx-renderer";
import { Favicon } from "@/components/Favicon.tsx";
import { Client } from "@/components/Client.tsx";
import { mountables } from "@/client/mountables.ts";

export type LayoutProps = { title?: string; icon?: string };

export default function Layout({
  children,
  title,
  icon = "⚡",
}: PropsWithChildren<LayoutProps>) {
  const now = isoNow();
  const dev = isDev();
  return (
    <html>
      <head>
        {title && <title>{title}</title>}
        {icon && <Favicon icon={icon} />}
        <link rel="stylesheet" href="/styles.css" />
        <script defer src="/client.js" />
      </head>
      <body>
        <header>
          <h1 class="text-center text-white text-3xl from-white to-orange-500 bg-gradient-to-t">
            FUNKY FLEEK FUNCTION FRAMEWORK
          </h1>
          <nav class="flex gap-2">
            <a href="/">home</a>
            <a href="/foo">Foo</a>
          </nav>
        </header>
        <main class="max-w-4xl mx-auto px-3 py-8 bg-orange-100">
          {children}
        </main>
        <footer class="fixed inset-0 top-auto border-t p-1 flex justify-between bg-white text-xs">
          <span>
            {dev && "[DEV]"} SSR: <time at={now}>{now}</time>{" "}
          </span>
          <span>&copy; Fleek Labs</span>
        </footer>
        {dev && <Client run="hmr" />}
      </body>
    </html>
  );
}

export function nested(Component: FC, layoutProps?: LayoutProps) {
  return jsxRenderer(({ Layout, children }) => {
    return (
      <Layout {...layoutProps}>
        <Component>{children}</Component>
      </Layout>
    );
  });
}

export const layoutProps = (props: LayoutProps) =>
  nested(({ children }) => children, props);

export function clientMount(Component: FC, where = "main") {
  const [what] = Object.entries(mountables).find(
    ([_, Mountable]) => Component === Mountable
  )!;
  return nested(({ children }) => (
    <>
      {children}
      <Client run="mount" opts={{ [where]: what }} />
    </>
  ));
}
