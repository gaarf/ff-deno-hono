/// <reference lib="dom" />
import { LoremIpsum } from "@/components/LoremIpsum.tsx";
import { render, useState } from "hono/jsx/dom";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>CLIENT SIDE COUNTER: {count}</p>
      <button onClick={() => setCount(count + 1)} class="border">Increment</button>
      <LoremIpsum />
    </div>
  );
}


render(<Counter />, document.querySelector("main")!);
