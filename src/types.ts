declare module "hono" {
  interface ContextRenderer {
    (content: string | Promise<string>, props?: DocumentProps): Response;
  }
}

export type DocumentProps = {
  title?: string;
  icon?: string;
};

