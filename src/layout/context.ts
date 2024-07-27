import { createContext } from "hono/jsx";
import { type LayoutProps } from "@/layout/Layout.tsx";

export default createContext<LayoutProps>({ url: null });
