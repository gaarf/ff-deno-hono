import { useCallback, useState } from "@/hooks.ts";
import { Button } from "@/components/intrinsic.ts";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback<EventListener>((event) => {
    console.log(event);
    setCount(c => c + 1);
  }, []);

  return (
    <Button
      class="rounded-full aspect-square w-8"
      onClick={handleClick}
    >
      {count}
    </Button>
  );
};
