import { useState } from "hono/jsx";

export const Counter = () => {
  const [count, setCount] = useState(0);
  return <button class="border min-w-10" onClick={() => setCount((c) => c + 1)}>{count}</button>;
};
