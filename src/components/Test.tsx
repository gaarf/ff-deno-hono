import { isBrowser, PropsWithChildren, toast } from "@/utils.ts";
import { useSsrContext } from "@/client/SsrContext.ts";
import { Box, Button, LoadingButton } from "@/components";
import { Json } from "@/components/Json.tsx";

export const Test = ({
  children,
  btnLabel = "goto test",
}: PropsWithChildren<{ btnLabel?: string }>) => {
  const ssr = useSsrContext();
  const browser = isBrowser();

  return (
    <Box className="flex-col gap-5 items-stretch border p-2 my-2">
      <h1 className="text-xl">this is the Test component</h1>
      <Json value={{ ...ssr, browser }} />
      <Box className="gap-10">
        <span className="flex-1">{children}</span>
        {browser && (
          <>
            <Button intent="warning" onClick={() => toast.success("yay")}>
              click for toast
            </Button>
            <LoadingButton href="/">
              another button
            </LoadingButton>
          </>
        )}
        <Button href="/test" disabled={browser}>
          {btnLabel}
        </Button>
      </Box>
    </Box>
  );
};
