import { SsrContext, SsrContextValue } from "@/client/SsrContext.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "@/react.shim.ts";

const queryClient = new QueryClient();

export const Providers = ({
  children,
  ssr,
}: React.PropsWithChildren<{ ssr?: SsrContextValue }>) => {
  const providers = (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  if (!ssr) { // client side...
    return providers;
  }

  return (
    <SsrContext.Provider value={ssr}>
      {providers}
    </SsrContext.Provider>
  );
};
