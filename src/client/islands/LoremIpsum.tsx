import { type PropsWithChildren } from "@/utils.ts";
import { Counter } from "@/components/Counter.tsx";
import { Box } from "@/components/intrinsic.ts";
import { Test } from "@/components/Test.tsx";

type LoremIpsumProps = {
  count?: number;
};

export const LoremIpsum = ({
  children,
  count = 1,
}: PropsWithChildren<LoremIpsumProps>) => {
  return (
    <div>
      {children}
      {Array(count)
        .fill(null)
        .map((_, i) => (
          <p className="italic my-2" key={i}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. In ipsum
            quia consequatur odit quidem qui doloremque inventore unde quaerat.
            Cupiditate suscipit vel temporibus natus facilis debitis, aspernatur
            autem nulla. Obcaecati!!
          </p>
        ))}
      <Box>
        <Counter />
        👏
      </Box>
      <Test />
    </div>
  );
};
