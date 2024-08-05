import { isoNow, type PropsWithChildren } from "@/utils.ts";
import { Favicon } from "@/server/layout/Favicon.tsx";
import { ClientRun } from "@/server/ClientRun.tsx";
import { Footer } from "@/server/layout/Footer.tsx";
import { type RendererProps } from "@/server/layout/SsrContext.ts";
// import { hybrid } from "@/client/islands/index.ts";
import { Header } from "@/client/islands/Header.tsx";
import { Providers } from "@/Providers.tsx";
import { useRequestContext } from "@/server/renderer.ts";

// const HybridHeader = hybrid.Header;

export function Document({
  children,
  ...props
}: PropsWithChildren<RendererProps>) {
  const now = isoNow();
  const c = useRequestContext();
  const dev = c.get("dev");
  const { title, icon = "🌐" } = props;
  return (
    <Providers
      ssr={{
        dev,
        url: new URL(c.req.url),
        ...props,
      }}
    >
      <html>
        <head>
          {title && <title>{title}</title>}
          <Favicon icon={icon} />
          <link rel="stylesheet" href="/styles.css" />
          <script defer src="/client.js" />
        </head>
        <body className="min-h-svh flex flex-col">
          {/* <HybridHeader fixed /> */}
          <Header fixed />
          <main className="flex-1 w-full relative p-3">{children}</main>
          <Footer>
            {dev && "[DEV]"} SSR: <time dateTime={now}>{now}</time>
          </Footer>
          {dev && <ClientRun name="hmr" />}
        </body>
      </html>
    </Providers>
  );
}
