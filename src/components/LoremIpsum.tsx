type LoremIpsumProps = {
  count?: number;
};

export const LoremIpsum = ({ count = 1 }: LoremIpsumProps) => {
  return (
    <>
      {Array(count)
        .fill(null)
        .map((_, i) => (
          <p class="italic mb-2" key={i}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. In ipsum
            quia consequatur odit quidem qui doloremque inventore unde quaerat.
            Cupiditate suscipit vel temporibus natus facilis debitis, aspernatur
            autem nulla. Obcaecati!!
          </p>
        ))}
    </>
  );
};
