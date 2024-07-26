import { type PropsWithChildren, type FC, isoNow, isDev } from "@/util.ts";
import { jsxRenderer } from "hono/jsx-renderer";
import { Favicon } from "@/components/Favicon.tsx";
import { Client } from "@/components/Client.tsx";

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
          <h1>header</h1>
          <nav class="flex gap-2">
            <a href="/">home</a>
            <a href="/foo">Foo</a>
          </nav>
        </header>
        <div class="max-w-4xl mx-auto p-3 pt-8">

          <main>{children}</main>
          <Client run="mountMain" opts={{ now }} />
          {dev && <Client run="hmr" />}

          <footer class="absolute inset-0 top-auto border-t p-1 flex justify-between text-xs">
            <span>
              {dev && "[DEV]"} SSR: <time at={now}>{now}</time>{" "}
            </span>
            <span>&copy; Fleek Labs</span>
          </footer>
        </div>
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
