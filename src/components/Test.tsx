import { isBrowser, PropsWithChildren } from "@/utils.ts";
import { useSsrContext } from "@/layout/SsrContext.ts";
import { Json } from "@/components/Json.tsx";
import { Button } from "@/components/intrinsic.ts";

export const Test = ({ children }: PropsWithChildren) => {
  const ssr = useSsrContext();
  const browser = isBrowser();

  return (
    <>
      <div>this is the Test component</div>
      <Json value={{ ...ssr, browser }} />
      {children}
      <Button>
        <div>hello</div>
      </Button>
    </>
  );
};
