import { useCallback, useState } from "@/utils.ts";
import { Button } from "@/components";

export const BtcPrice = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return <Button onClick={handleClick}>BtcPrice {count}</Button>;
};
