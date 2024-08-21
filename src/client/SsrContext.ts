import { createContext, useContext } from "@/react.shim.ts";
import { getEmoji } from "@/server/layout/Favicon.tsx";
import { isBrowser } from "@/utils.ts";
import { type AuthUser } from "@supabase/supabase-js";

export type RendererProps = {
  icon?: string;
  title?: string;
};

export type SsrContextValue = {
  url: URL | null;
  user: AuthUser | null;
  dev: boolean;
} & RendererProps;

const b = isBrowser();
export const SsrContext = createContext<SsrContextValue>({
  url: b ? new URL(location.href) : null,
  user: b
    ? JSON.parse(document.querySelector("head > #user")!.textContent!)
    : null,
  dev: b && !!document.querySelector('[data-client-run="hmr"]'),
  icon: b ? getEmoji() : undefined,
  title: b ? document.title : undefined,
});

export const useSsrContext = () => useContext(SsrContext);

export const usePathname = () => useSsrContext().url!.pathname;

export default SsrContext;
