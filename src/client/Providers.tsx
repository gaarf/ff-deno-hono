/** @jsxImportSource npm:react-jsx */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "@/client/react.shim.ts";

const queryClient = new QueryClient();

export const Providers = ({ children }: React.PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
