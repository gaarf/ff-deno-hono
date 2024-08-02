import { BtcPrice } from "@/client/islands/BtcPrice.tsx";
import { LoremIpsum } from "@/client/islands/LoremIpsum.tsx";
import { Header } from "@/client/islands/Header.tsx";

import { withHybrid } from "@/server/ClientRun.tsx";
import { ComponentType } from "@/utils.ts";
import { mapValues } from "std/collections/mod.ts";

/* islands cannot have state! however their children can. */

export const mountables: Record<string, ComponentType> = {
  LoremIpsum,
  BtcPrice,
  Header,
} as const;

export type Mountable = keyof typeof mountables;

export const hybrid = mapValues(mountables, withHybrid);

export function mountableName<T>(Component: ComponentType<T>) {
  return Object.entries(mountables).find(
    ([_, Candidate]) => Component === Candidate
  )?.[0];
}
