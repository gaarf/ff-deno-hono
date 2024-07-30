import { createContext } from "hono/jsx";
import { useContext } from "@/hooks.ts";
import { type DocumentProps } from "@/types.ts";

const SsrContext = createContext<
  {
    url: URL | null;
  } & DocumentProps
>({
  url: null,
});

export const useSsrContext = () => useContext(SsrContext);

export default SsrContext;
