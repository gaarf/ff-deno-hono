import { isoNow, type PropsWithChildren } from "@/utils.ts";
import { Favicon } from "@/server/layout/Favicon.tsx";
import { ClientRun } from "@/server/Hybrid.tsx";
import { Footer } from "@/server/layout/Footer.tsx";
import { type RendererProps } from "@/server/layout/SsrContext.ts";
import { hybrid } from "@/client/islands/index.ts";
import { Providers } from "@/Providers.tsx";
import { useRequestContext } from "@/server/renderer.ts";
import { Container } from "@/server/layout/Container.tsx";

export function Document({
  children,
  ...props
}: PropsWithChildren<RendererProps>) {
  const now = isoNow();
  const c = useRequestContext();
  const dev = c.get("dev");
  const theme = c.get("theme");
  const { title, icon = "🌐" } = props;

  return (
    <Providers
      ssr={{
        dev,
        url: new URL(c.req.url),
        ...props,
      }}
    >
      <html data-theme={theme}>
        <head>
          {title && <title>{title}</title>}
          <Favicon icon={icon} />
          <link rel="stylesheet" href="/styles.css" />
          <script defer src="/client.js" />
        </head>
        <body className="min-h-svh flex flex-col text-default-text bg-default-bg">
          <hybrid.Toaster />
          <hybrid.Header fixed />
          <main className="flex-1 w-full flex justify-center items-start">
            <Container className="relative my-3 block">{children}</Container>
          </main>
          <Footer>
            {dev && "[DEV]"} SSR: <time dateTime={now}>{now}</time>
          </Footer>
          {dev && <ClientRun name="hmr" />}
        </body>
      </html>
    </Providers>
  );
}
