/// <reference lib="dom" />
import runners, { NamedRunner, RunPromise } from "@/client/runners/index.ts";

const dataAttr = "data-client-run";
const boot = "🥾";
console.time(boot);

const todo: [NamedRunner, ...Parameters<RunPromise>][] = [];

document.querySelectorAll(`object[${dataAttr}]`).forEach((o) => {
  const name = o.getAttribute(dataAttr) as NamedRunner;
  if (runners[name]) {
    try {
      const { textContent } = o;
      todo.push([name, textContent ? JSON.parse(textContent) : {}]);
    } catch (e) {
      console.error(e);
    }
  }
});
console.timeLog(boot, todo);

Promise.all(
  todo.map(([name, ...args]) => (runners[name] as RunPromise)(...args))
).finally(() => console.timeEnd(boot));
