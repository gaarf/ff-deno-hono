import mount from "@/client/runners/mount.ts";
import hmr from "@/client/runners/hmr.ts";

const runners = {
  mount,
  hmr
} as const;

export type Runner = keyof typeof runners;

export default runners;
