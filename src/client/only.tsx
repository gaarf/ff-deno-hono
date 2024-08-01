import { ComponentType, isBrowser, PropsWithChildren } from "@/utils.ts";

const browser = isBrowser();

const DefaulFallback = () => <object className="size-0" />;

// HOC renders an inert object on the server
export default function clientOnly<T>(Component: ComponentType<T>, Fallback = DefaulFallback) {
  return (props: PropsWithChildren<T>) => {
    return browser ? <Component {...props} /> : <Fallback />;
  };
}
