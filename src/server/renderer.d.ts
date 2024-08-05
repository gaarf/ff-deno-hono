import { type RendererProps } from "@/server/layout/SsrContext.ts";
import { Context, Env, MiddlewareHandler } from "hono";
import React from "@/react.shim.ts";
// @ts-types="npm:@types/react-dom/server"
import { RenderToReadableStreamOptions } from "react-dom/server";
import { PropsWithChildren } from "@/react.shim.ts";

type RendererOptions = {
  docType?: boolean | string;
  stream?: boolean | Record<string, string>;
  readableStreamOptions?: RenderToReadableStreamOptions;
};

type BaseProps = {
  c: Context;
  children: React.ReactElement;
};

type UnknownRecord = Record<string, unknown>;

type ComponentProps = Props &
  BaseProps & {
    Layout: React.FC<PropsWithChildren<RendererProps>>;
  };

declare const reactRenderer: (
  component?: React.FC<ComponentProps>,
  options?: RendererOptions
) => MiddlewareHandler;

declare const useRequestContext: <E extends Env = UnknownRecord>() => Context<
  E,
  string,
  UnknownRecord
>;

interface Props extends RendererProps {}

declare module "hono" {
  interface ContextRenderer {
    (children: React.ReactElement, props?: Props): Response | Promise<Response>;
  }
}

export { type Props, reactRenderer, useRequestContext };
