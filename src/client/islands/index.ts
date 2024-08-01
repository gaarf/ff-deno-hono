import { BtcPrice } from "@/client/islands/BtcPrice.tsx";
import { LoremIpsum } from "@/client/islands/LoremIpsum.tsx";
import { Header } from "@/client/islands/Header.tsx";

import { withHybrid } from "@/client/ClientRun.tsx";
import { ComponentType } from "@/utils.ts";

/* islands cannot have state! however their children can. */

export const mountables = {
  LoremIpsum,
  BtcPrice,
  Header,
} as const;

export type Mountable = keyof typeof mountables;

export const hybrid = {
  LoremIpsum: withHybrid(LoremIpsum),
  BtcPrice: withHybrid(BtcPrice)
};

export function mountableName<T>(Component: ComponentType<T>) {
  return Object.entries(mountables).find(
    ([_, Mountable]) => Component === Mountable
  )?.[0];
}