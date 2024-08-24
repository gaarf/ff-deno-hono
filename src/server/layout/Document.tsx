import { isoNow, type PropsWithChildren } from "@/utils.ts";
import { Favicon } from "@/server/layout/Favicon.tsx";
import { ClientRun } from "@/server/Hybrid.tsx";
import { Footer } from "@/server/layout/Footer.tsx";
import { type RendererProps } from "@/client/SsrContext.ts";
import { hybrid } from "@/client/islands/index.ts";
import { Providers } from "@/Providers.tsx";
import { useRequestContext } from "@/server/context.ts";
import { Container } from "@/server/layout/Container.tsx";
import { TimeAgo } from "@/components";

const bootTime = isoNow();

export function Document({
  children,
  ...props
}: PropsWithChildren<RendererProps>) {
  const c = useRequestContext();
  const dev = c.get("dev");
  const theme = c.get("theme");
  const user = c.get("user");
  const { title, icon = "🌐" } = props;

  return (
    <Providers
      ssr={{
        url: new URL(c.req.url),
        user,
        dev,
        ...props,
      }}
    >
      <html data-theme={theme}>
        <head>
          {title && <title>{title}</title>}
          <Favicon icon={icon} />
          <link rel="stylesheet" href="/styles.css" />
          <script defer src="/client.js" />
          <script
            id="user"
            type="application/json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(user) }}
          />
        </head>
        <body className="min-h-svh flex flex-col text-default-text bg-default-bg">
          <hybrid.Header fixed />
          <main className="flex-1 w-full flex justify-center">
            <Container className="relative my-3 block">{children}</Container>
          </main>
          <Footer>
            {dev && "[DEV]"} boot <TimeAgo when={bootTime} />
          </Footer>
          <hybrid.Toaster />
          {dev && <ClientRun name="hmr" />}
        </body>
      </html>
    </Providers>
  );
}
