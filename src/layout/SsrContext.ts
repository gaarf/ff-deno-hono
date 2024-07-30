import { createContext, useContext } from "hono/jsx";
import { DocumentProps } from "@/layout/Document.tsx";

const SsrContext = createContext<
  {
    url: URL | null;
  } & DocumentProps
>({
  url: null,
});

export const useSsrContext = () => useContext(SsrContext);

export default SsrContext;
