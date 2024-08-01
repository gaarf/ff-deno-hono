import { createContext } from "hono/jsx";
import { useContext } from "@/server/hooks.ts";
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

export default SsrContext;
