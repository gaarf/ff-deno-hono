import { BtcPrice } from "@/client/islands/BtcPrice.tsx";
import { LoremIpsum } from "@/client/islands/LoremIpsum.tsx";
import { Header } from "@/client/islands/Header.tsx";
import { Toaster } from "@/client/islands/Toaster.tsx";

import { withHybrid } from "@/server/Hybrid.tsx";
import { ComponentType } from "@/utils.ts";
import { mapValues } from "std/collections/mod.ts";

export const mountables = {
  Toaster,
  LoremIpsum,
  BtcPrice,
  Header,
} as const;

export type Mountables = typeof mountables;
export type NamedMountable = keyof Mountables;

export const hybrid = mapValues(mountables, withHybrid) as Mountables;

export function mountableName<T>(Component: ComponentType<T>) {
  return Object.entries(mountables).find(
    ([_, Candidate]) => Component === Candidate,
  )?.[0] as NamedMountable;
}
