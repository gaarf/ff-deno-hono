/// <reference lib="dom" />
import runners, { Runner } from "@/client/runners/index.ts";

const dataAttr = 'data-client-run';

document.querySelectorAll(`object[${dataAttr}]`).forEach(o => {
  const run = runners[o.getAttribute(dataAttr) as Runner];
  if (run) {
    try {
      const { textContent } = o;
      run(textContent ? JSON.parse(textContent) : {});  
    }
    catch(e) {
      console.error(e);
    }
  }
})