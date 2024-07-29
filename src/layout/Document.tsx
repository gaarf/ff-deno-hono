import { type PropsWithChildren, isoNow, isDev } from "@/util.ts";
import { Favicon } from "@/layout/Favicon.tsx";
import { ClientRun } from "@/client/ClientRun.tsx";
import { Header } from "@/islands/Header.tsx";
import { Footer } from "@/layout/Footer.tsx";
import { Hybrid } from "@/client/Hybrid.tsx";

export type DocumentProps = {
  title?: string;
  icon?: string;
};

export default function Layout({
  children,
  ...props
}: PropsWithChildren<DocumentProps>) {
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
        <Hybrid>
          <Header fixed />
        </Hybrid>
        <main class="flex-1 w-full relative p-3">{children}</main>
        <Footer>
          {dev && "[DEV]"} SSR: <time at={now}>{now}</time>
        </Footer>
        {dev && <ClientRun name="hmr" />}
      </body>
    </html>
  );
}

