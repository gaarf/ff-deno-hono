import { type ComponentType } from "@/utils.ts";
import { Counter } from "@/components/Counter.tsx";


type LoremIpsumProps = {
  count?: number;
};

export const LoremIpsum: ComponentType<LoremIpsumProps> = ({
  children,
  count = 1,
}) => {
  return (
    <>
      {children}
      {Array(count)
        .fill(null)
        .map((_, i) => (
          <p class="italic my-2" key={i}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. In ipsum
            quia consequatur odit quidem qui doloremque inventore unde quaerat.
            Cupiditate suscipit vel temporibus natus facilis debitis, aspernatur
            autem nulla. Obcaecati!!
          </p>
        ))}
        <Counter />
    </>
  );
};
