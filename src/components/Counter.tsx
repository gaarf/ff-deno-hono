import { useCallback, useState } from "@/utils.ts";
import { Button } from "@/components";
import clientOnly from "@/client/only.tsx";

export const Counter = clientOnly(() => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback<React.MouseEventHandler>((event) => {
    console.log(event);
    setCount((c) => c + 1);
  }, []);

  return (
    <Button
      className="rounded-full aspect-square w-8"
      onClick={handleClick}
    >
      {count}
    </Button>
  );
});
