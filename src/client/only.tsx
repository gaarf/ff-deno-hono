import { ComponentType, isBrowser, PropsWithChildren } from "@/utils.ts";

const browser = isBrowser();

export default function clientOnly<T>(Component: ComponentType<T>, fallback = () => '') {
  return (props: PropsWithChildren<T>) => {
    return browser ? <Component {...props} /> : fallback();
  };
}
