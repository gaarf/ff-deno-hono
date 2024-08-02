import { isoNow, type PropsWithChildren } from "@/utils.ts";
import { Favicon } from "@/server/layout/Favicon.tsx";
import { ClientRun } from "@/server/ClientRun.tsx";
import { Footer } from "@/server/layout/Footer.tsx";
import {
  type DocumentProps,
  useSsrContext,
} from "@/server/layout/SsrContext.ts";
import { hybrid } from "@/client/islands/index.ts";

const HybridHeader = hybrid.Header;

export default function Document({
  children,
  ...props
}: PropsWithChildren<DocumentProps>) {
  const now = isoNow();
  const { dev } = useSsrContext();
  const { title, icon = "🌐" } = props;
  return (
    <html>
      <head>
        {title && <title>{title}</title>}
        <Favicon icon={icon} />
        <link rel="stylesheet" href="/styles.css" />
        <script defer src="/client.js" />
      </head>
      <body class="min-h-svh flex flex-col">
        <HybridHeader fixed />
        <main class="flex-1 w-full relative p-3">{children}</main>
        <Footer>
          {dev && "[DEV]"} SSR: <time at={now}>{now}</time>
        </Footer>
        {dev && <ClientRun name="hmr" />}
      </body>
    </html>
  );
}
