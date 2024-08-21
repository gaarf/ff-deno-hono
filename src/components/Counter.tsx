import { useCallback, useState } from "@/react.shim.ts";
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
      className="rounded-full min-w-10 aspect-square"
      onClick={handleClick}
      intent={!count
        ? "neutral"
        : count % 3
        ? "danger"
        : count % 2
        ? "warning"
        : "success"}
    >
      {count}
    </Button>
  );
});
