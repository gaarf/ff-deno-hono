import mount from "@/client/runners/mount.ts";

let hmr = (_o: unknown) => Promise.resolve();
DEV: {
  hmr = (await import("@/client/runners/hmr.ts")).default;
  break DEV;
}

const runners = {
  mount,
  hmr
} as const;

export type NamedRunner = keyof typeof runners;
export type RunPromise = (opts: Record<string, unknown>) => Promise<void>;

export default runners;
