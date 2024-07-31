import { createContext } from "hono/jsx";
import { useContext } from "@/hooks.ts";
import { isBrowser } from "@/utils.ts";

export type DocumentProps = {
  title?: string;
  icon?: string;
};

function getIcon() {
  if (isBrowser()) {
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    const emoji = link?.href.match(/>([^<]*)<\/text><\/svg>$/);
    if (emoji) {
      return decodeURIComponent(emoji[1]);
    }
  }
}

const SsrContext = createContext<
  {
    url: URL | null;
    dev: boolean;
  } & DocumentProps
>({
  url: isBrowser() ? new URL(location.href) : null,
  dev: isBrowser() && !!document.querySelector('[data-client-run="hmr"]'),
  title: isBrowser() ? document.title : undefined,
  icon: getIcon(),
});

export const useSsrContext = () => useContext(SsrContext);

export default SsrContext;
