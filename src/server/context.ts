import React from "@/react.shim.ts";
import { type Context, type Env } from "hono";

export const RequestContext = React.createContext<Context | null>(null);

export const useRequestContext = <E extends Env>(): Context<E> => {
  const c = React.useContext(RequestContext);
  if (!c) {
    throw new Error("RequestContext is not provided.");
  }
  return c;
};
