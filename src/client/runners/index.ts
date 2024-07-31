import mount from "@/client/runners/mount.ts";
import hmr from "@/client/runners/hmr.ts";

const runners = {
  mount,
  hmr
} as const;

export type NamedRunner = keyof typeof runners;
export type RunPromise = (opts: Record<string, unknown>) => Promise<void>;

export default runners;
