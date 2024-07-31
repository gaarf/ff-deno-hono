import { type PropsWithChildren, isoNow } from "@/util.ts";
import { Favicon } from "@/layout/Favicon.tsx";
import { ClientRun } from "@/client/ClientRun.tsx";
import { Header } from "@/islands/Header.tsx";
import { Footer } from "@/layout/Footer.tsx";
import { withHybrid } from "@/client/Hybrid.tsx";
import Providers from "@/layout/Providers.tsx";
import { type DocumentProps } from "@/types.ts";
import { useSsrContext } from "@/layout/SsrContext.ts";

const HybridHeader = withHybrid(Header);

export default function Layout({
  children,
  ...props
}: PropsWithChildren<DocumentProps>) {
  const now = isoNow();
  const { dev } = useSsrContext();
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
        <Providers>
          <HybridHeader fixed />
          <main class="flex-1 w-full relative p-3">{children}</main>
          <Footer>
            {dev && "[DEV]"} SSR: <time at={now}>{now}</time>
          </Footer>
        </Providers>
        {dev && <ClientRun name="hmr" />}
      </body>
    </html>
  );
}
