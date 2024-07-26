import mountMain from "@/client/runners/mountMain.ts";
import hmr from "@/client/runners/hmr.ts";

const runners = {
  mountMain,
  hmr
} as const;

export type Runner = keyof typeof runners;

export default runners;
