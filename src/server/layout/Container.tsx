import { Box } from "@/components";
import { cn } from "@/utils.ts";

export const Container = ({
  children,
  className,
}: Parameters<typeof Box>[0]) => {
  return (
    <Box
      className={cn(
        "gap-4 justify-between w-full px-3 max-w-5xl",
        className,
      )}
    >
      {children}
    </Box>
  );
};
