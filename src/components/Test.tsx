import { isBrowser, PropsWithChildren } from "@/utils.ts";
import { useSsrContext } from "@/layout/SsrContext.ts";
import { Json } from "@/components/Json.tsx";
import { Box, Button } from "@/components/intrinsic.ts";

export const Test = ({ children }: PropsWithChildren) => {
  const ssr = useSsrContext();
  const browser = isBrowser();

  return (
    <Box class="flex-col gap-5">
      <h1 class="text-xl text-center">this is the Test component</h1>
      <Json value={{ ...ssr, browser }} />
      <Box>
        {children}
        <Button disabled>hello</Button>
      </Box>
    </Box>
  );
};
