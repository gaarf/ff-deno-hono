import { createContext, useContext } from "@/react.shim.ts";
import { getEmoji } from "@/server/layout/Favicon.tsx";
import { isBrowser } from "@/utils.ts";

export type RendererProps = {
  icon?: string;
  title?: string;
};

export type SsrContextValue = {
  url: URL | null;
  dev: boolean;
} & RendererProps;

export const SsrContext = createContext<SsrContextValue>({
  url: isBrowser() ? new URL(location.href) : null,
  dev: isBrowser() && !!document.querySelector('[data-client-run="hmr"]'),
  icon: isBrowser() ? getEmoji() : undefined,
  title: isBrowser() ? document.title : undefined,
});

export const useSsrContext = () => useContext(SsrContext);

export const usePathname = () => useSsrContext().url!.pathname;

export default SsrContext;
