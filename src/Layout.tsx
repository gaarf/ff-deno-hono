import { type PropsWithChildren, type FC } from "@/util.ts";
import { jsxRenderer } from "hono/jsx-renderer";
import { Favicon } from "@/components/Favicon.tsx";

type LayoutProps = { title?: string; icon?: string };

export default function Layout({ children, title, icon = "⚡" }: PropsWithChildren<LayoutProps>) {
  return (
    <html>
      <head>
        {title && <title>{title}</title>}
        {icon && <Favicon icon={icon} />}
        <link rel="stylesheet" href="/styles.css" />
        <script defer src="/client.js" />
      </head>
      <body>
        <div class="max-w-[500px] mx-auto bg-blue-200">
          <header>
            <h1>header</h1>
            <nav class="flex gap-2">
              <a href="/">home</a>
              <a href="/foo">Foo</a>
            </nav>
          </header>
          <main>{children}</main>
          <footer>
            <hr />
            footer
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
