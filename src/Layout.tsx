import { type PropsWithChildren, type FC, isoNow, isDev } from "@/util.ts";
import { jsxRenderer } from "hono/jsx-renderer";
import { Favicon } from "@/components/Favicon.tsx";
import { Client } from "@/components/Client.tsx";
import { mountables } from "@/client/mountables.ts";
import { Header } from "@/fragments/Header.tsx";
import { Footer } from "@/fragments/Footer.tsx";

export type LayoutProps = { title?: string; icon?: string };

export default function Layout({
  children,
  title,
  icon = "⚡",
}: PropsWithChildren<LayoutProps>) {
  const now = isoNow();
  const dev = isDev();

  const cacheBust = dev ? `?now=${encodeURIComponent(now)}`: '';

  return (
    <html>
      <head>
        {title && <title>{title}</title>}
        {icon && <Favicon icon={icon} />}
        <link rel="stylesheet" href={`/styles.css${cacheBust}`} />
        <script defer src={`/client.js${cacheBust}`} />
      </head>
      <body>
        <Header />
        <main class="max-w-4xl mx-auto px-3 py-8">
          {children}
        </main>
        <Footer>
          {dev && "[DEV]"} SSR: <time at={now}>{now}</time>
        </Footer>
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
