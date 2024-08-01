import { createContext, useContext } from "hono/jsx";
import { getEmoji } from "@/server/layout/Favicon.tsx";
import { isBrowser } from "@/utils.ts";

export type DocumentProps = {
  title?: string;
  icon?: string;
};

const SsrContext = createContext<
  {
    url: URL | null;
    dev: boolean;
  } & DocumentProps
>({
  url: isBrowser() ? new URL(location.href) : null,
  dev: isBrowser() && !!document.querySelector('[data-client-run="hmr"]'),
  title: isBrowser() ? document.title : undefined,
  icon: isBrowser() ? getEmoji() : undefined,
});

export const useSsrContext = () => useContext(SsrContext);

export const usePathname = () => useSsrContext().url!.pathname;

export default SsrContext;