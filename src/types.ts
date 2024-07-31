declare module "hono" {
  interface ContextRenderer {
    (content: string | Promise<string>, props?: DocumentProps): Response;
  }
  interface ContextVariableMap {
    dev: boolean;
  }
}

export type DocumentProps = {
  title?: string;
  icon?: string;
};

