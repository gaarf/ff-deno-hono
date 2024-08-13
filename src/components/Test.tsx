import { isBrowser, PropsWithChildren, toast } from "@/utils.ts";
import { useSsrContext } from "@/server/layout/SsrContext.ts";
import { Box, Button } from "@/components";
import { Json } from "@/components/Json.tsx";
import { useState } from "@/react.shim.ts";

export const Test = ({
  children,
  btnLabel = "goto foo",
}: PropsWithChildren<{ btnLabel?: string }>) => {
  const ssr = useSsrContext();
  const browser = isBrowser();
  const [loading, setLoading] = useState(false);
  return (
    <Box className="flex-col gap-5 items-stretch border p-2 my-2">
      <h1 className="text-xl">this is the Test component</h1>
      <Json value={{ ...ssr, browser }} />
      <Box className="gap-10">
        <span className="flex-1">{children}</span>
        {browser && (
          <>
            <Button
              variant="warning"
              onClick={() => toast.success("yay")}
            >
              click for toast
            </Button>
            <Button
              loading={loading}
              onClick={() => setLoading(true)}
              href="/foo/btc"
            >
              another button
            </Button>
          </>
        )}
        <Button href="/foo" disabled={browser}>
          {btnLabel}
        </Button>
      </Box>
    </Box>
  );
};
