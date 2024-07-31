import { useSsrContext } from "@/layout/SsrContext.ts";
import { useEffect } from "hono/jsx";

export { useEffect };
export { useState, useMemo, useCallback, useRef, useContext } from "hono/jsx";

export const usePathname = () => useSsrContext().url!.pathname;

export const useInterval = (handler: TimerHandler, delay: number) => {
  return useEffect(() => {
    const timer = setInterval(handler, delay);
    return () => {
      clearInterval(timer);
    };
  }, [handler, delay]);
};
