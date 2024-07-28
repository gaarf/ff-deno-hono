import { createContext, useContext } from "hono/jsx";
import { DocumentProps } from "@/layout/Document.tsx";

const LayoutContext = createContext<
  {
    url: URL | null;
  } & DocumentProps
>({
  url: null,
});

export const useLayoutContext = () => useContext(LayoutContext);

export default LayoutContext;
