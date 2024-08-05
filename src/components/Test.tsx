import { isBrowser, PropsWithChildren } from "@/utils.ts";
import { useSsrContext } from "@/server/layout/SsrContext.ts";
import { Box, Button } from "@/components";
import { Json } from "@/components/Json.tsx";

export const Test = (
  { children, btnLabel = "hello" }: PropsWithChildren<{ btnLabel?: string }>,
) => {
  const ssr = useSsrContext();
  const browser = isBrowser();

  return (
    <Box className="flex-col gap-5">
      <h1 className="text-xl text-center">this is the Test component</h1>
      <Json value={{ ...ssr, browser }} />
      <Box className="items-center">
        {children}
        <Button loading>{btnLabel}</Button>
      </Box>
    </Box>
  );
};
