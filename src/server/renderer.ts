// adapted from https://github.com/honojs/middleware/tree/main/packages/react-renderer

import { type RendererProps } from "@/client/SsrContext.ts";
import type { Context, ContextRenderer, MiddlewareHandler } from "hono";
import React from "@/react.shim.ts";
// @ts-types="npm:@types/react-dom/server"
import {
  renderToReadableStream,
  RenderToReadableStreamOptions,
  renderToString,
} from "react-dom/server";
import { RequestContext } from "@/server/context.ts";

type RendererOptions = {
  docType?: boolean | string;
  stream?: boolean | Record<string, string>;
  readableStreamOptions?: RenderToReadableStreamOptions;
};

type BaseProps = {
  c: Context;
  children?: React.ReactNode;
};

type LayoutType = React.FC<BaseProps & RendererProps>;

type ComponentProps =
  & BaseProps
  & RendererProps
  & {
    Layout: LayoutType;
  };

declare module "hono" {
  interface ContextRenderer {
    (
      content: string | Promise<string> | React.ReactNode,
      props?: RendererProps,
    ): Response | Promise<Response>;
  }
}

const createRenderer = (
  c: Context,
  Layout: LayoutType,
  component?: React.FC<ComponentProps>,
  options?: RendererOptions,
) =>
  async function renderer(children: React.ReactNode, props?: RendererProps) {
    const node = component
      ? component({ children, Layout, c, ...props })
      : children;

    if (options?.stream) {
      const stream = await renderToReadableStream(
        React.createElement(RequestContext.Provider, { value: c }, node),
        options.readableStreamOptions,
      );
      if (options.stream === true) {
        c.header("Transfer-Encoding", "chunked");
        c.header("Content-Type", "text/html; charset=UTF-8");
      } else {
        for (const [key, value] of Object.entries(options.stream)) {
          c.header(key, value);
        }
      }
      return c.body(stream);
    } else {
      const docType = typeof options?.docType === "string"
        ? options.docType
        : options?.docType === true
        ? "<!DOCTYPE html>"
        : "";
      const body = docType +
        renderToString(
          React.createElement(RequestContext.Provider, { value: c }, node),
        );
      return c.html(body);
    }
  };

export const reactRenderer = (
  component?: React.FC<ComponentProps>,
  options?: RendererOptions,
): MiddlewareHandler =>
  function reactRenderer(c, next) {
    const Layout = (c.getLayout() ?? React.Fragment) as LayoutType;
    if (component) {
      c.setLayout((props) => {
        return component({ ...props, Layout, c }, c);
      });
    }
    c.setRenderer(
      createRenderer(c, Layout, component, options) as ContextRenderer,
    );
    return next();
  };
