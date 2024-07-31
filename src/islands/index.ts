import { LoremIpsum } from "@/islands/LoremIpsum.tsx";
import { Header } from "@/islands/Header.tsx";
import { withHybrid } from "@/client/ClientRun.tsx";

/* islands cannot have state! however their children can. */

export const mountables = { LoremIpsum, Header } as const;

export type Mountable = keyof typeof mountables;

export const hybrid = {
  LoremIpsum: withHybrid(LoremIpsum),
}
