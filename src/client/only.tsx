import { ComponentType, isBrowser, PropsWithChildren } from "@/utils.ts";

const browser = isBrowser();

// HOC renders an inert object on the server
export default function clientOnly<T>(Component: ComponentType<T>, fallbackClass = "size-0") {
  return (props: PropsWithChildren<T>) => {
    return browser ? <Component {...props} /> : <object class={fallbackClass} />;
  };
}
