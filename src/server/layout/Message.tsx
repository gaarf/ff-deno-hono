import { Box, Icon } from "@/components";
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
        "w-full justify-start gap-2 p-2 rounded border border-transparent",
        {
          "border-warning-8 text-warning-11": intent === "warning",
          "bg-danger-9 text-danger-1": intent === "danger",
          "bg-success-8 text-success-1": intent === "success",
          "border-neutral-8 bg-neutral-2": intent === "neutral",
        },
        className,
      )}
    >
      {intent === "warning" && <Icon.Warning />}
      {intent === "danger" && <Icon.Danger />}
      {intent === "success" && <Icon.Success />}
      {intent === "neutral" && <Icon.Message />}
      {children}
    </Box>
  );
};
