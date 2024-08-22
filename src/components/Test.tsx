import { isBrowser, PropsWithChildren, toast } from "@/utils.ts";
import { useSsrContext } from "@/client/SsrContext.ts";
import { Box, Button, ButtonGroup, LoadingButton } from "@/components";
import { Json } from "@/components/Json.tsx";
import { ColorGrid } from "@/theme/Palette.tsx";
import { Message } from "@/server/layout/Message.tsx";

export const Test = ({
  children,
  btnLabel = "goto test",
}: PropsWithChildren<{ btnLabel?: string }>) => {
  const ssr = useSsrContext();
  const browser = isBrowser();

  return (
    <Box className="flex-col gap-5 items-stretch my-2">
      <h1 className="text-xl">this is the Test component</h1>
      <Json value={{ ...ssr, browser }} />
      <Box className="gap-2 flex-wrap">
        <span className="flex-1">{children}</span>
        {browser && (
          <ButtonGroup>
            <Button onClick={() => toast("yay")}>neutral</Button>
            <Button intent="warning" onClick={() => toast.warning("yay")}>
              warning
            </Button>
            <Button intent="danger" onClick={() => toast.error("yay")}>
              danger
            </Button>
            <Button intent="success" onClick={() => toast.success("yay")}>
              success
            </Button>
            <Button intent="accent" onClick={() => toast.info("yay")}>
              accent
            </Button>
            <LoadingButton href="/">another button</LoadingButton>
          </ButtonGroup>
        )}
        <Button href="/test" disabled={browser}>
          {btnLabel}
        </Button>
      </Box>

      <Message intent="neutral">neutral</Message>
      <Message intent="warning">warning</Message>
      <Message intent="danger">danger</Message>
      <Message intent="success">success</Message>
      <Message intent="accent">accent</Message>


      <ColorGrid />
    </Box>
  );
};
