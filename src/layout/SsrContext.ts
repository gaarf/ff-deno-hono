import { createContext } from "hono/jsx";
import { useContext } from "@/hooks.ts";

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
  url: null,
  dev: false
});

export const useSsrContext = () => useContext(SsrContext);

export default SsrContext;
