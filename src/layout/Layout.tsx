import { type PropsWithChildren, isoNow, isDev } from "@/util.ts";
import { Favicon } from "@/components/Favicon.tsx";
import { Client } from "@/components/Client.tsx";
import { Header } from "@/fragments/Header.tsx";
import { Footer } from "@/fragments/Footer.tsx";
import { createMiddleware } from "hono/factory";

declare module "hono" {
  interface ContextRenderer {
    (content: string | Promise<string>, props?: LayoutProps): Response;
  }
}
export type LayoutProps = {
  title?: string;
  icon?: string;
};

export default function Layout({
  children,
  ...props
}: PropsWithChildren<LayoutProps>) {
  const now = isoNow();
  const dev = isDev();
  const { title = "FFF", icon = "⚡" } = props;
  return (
    <html>
      <head>
        {title && <title>{title}</title>}
        {icon && <Favicon icon={icon} />}
        <link rel="stylesheet" href="/styles.css" />
        <script defer src="/client.js" />
      </head>
      <body class="min-h-svh flex flex-col">
        <Header fixed />
        <main class="flex-1 w-full relative p-3">{children}</main>
        <Footer>
          {dev && "[DEV]"} SSR: <time at={now}>{now}</time>
        </Footer>
        {dev && <Client run="hmr" />}
      </body>
    </html>
  );
}

export const layoutMiddleware = createMiddleware((c, next) => {
  c.setLayout(Layout);
  return next();
});
