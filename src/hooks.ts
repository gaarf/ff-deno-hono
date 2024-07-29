import { isBrowser } from "@/util.ts";
import { useLayoutContext } from "@/layout/context.ts";
import { useState, useMemo, useCallback, useRef, useEffect } from "hono/jsx";

export { useState, useMemo, useCallback, useRef, useEffect };

export const useUrl = () =>
  isBrowser() ? new URL(location.href) : useLayoutContext().url!;

export const usePathname = () => useUrl().pathname;

export const useInterval = (handler: TimerHandler, delay: number) => {
  return useEffect(() => {
    const timer = setInterval(handler, delay);
    return () => {
      clearInterval(timer);
    };
  }, [handler, delay]);
};
