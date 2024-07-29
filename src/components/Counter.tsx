import { JSX, useState } from "hono/jsx";
import { cn } from "@/util.ts";

export const Counter = (props: JSX.IntrinsicElements["button"]) => {
  const [count, setCount] = useState(0);
  return (
    <button
      {...props}
      class={cn("border rounded-full aspect-square w-8", props.class)}
      onClick={() => setCount((c) => c + 1)}
    >
      {count}
    </button>
  );
};
