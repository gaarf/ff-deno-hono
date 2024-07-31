import { createContext } from "hono/jsx";
import { useContext } from "@/hooks.ts";
import { type DocumentProps } from "@/types.ts";

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
