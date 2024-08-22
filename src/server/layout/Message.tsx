import { Box, IntentIcon } from "@/components";
import { cn } from "@/utils.ts";
import { useRequestContext } from "@/server/context.ts";
import { type Intent } from "@/theme/index.ts";
import { type Context } from "hono";
import React, { type PropsWithChildren } from "@/react.shim.ts";

declare module "hono" {
  interface ContextVariableMap {
    message?: React.ReactNode;
  }
}

export const setMessage = (c: Context, message: string, intent?: Intent) => {
  c.set("message", <Message intent={intent}>{message}</Message>);
};

export function useMessage() {
  return useRequestContext().get("message");
}

export const Message = ({
  children,
  className,
  intent = "neutral",
}: PropsWithChildren<{
  className?: string;
  intent?: Intent;
}>) => {
  return (
    <Box
      className={cn(
        "w-full justify-start gap-2 p-2 rounded shadow",
        {
          "bg-warning-1": intent === "warning",
          "bg-danger-1": intent === "danger",
          "bg-success-1": intent === "success",
          "bg-accent-2": intent === "accent",
          "bg-neutral-2": intent === "neutral",
        },
        className,
      )}
    >
      <IntentIcon intent={intent} />
      {children}
    </Box>
  );
};
