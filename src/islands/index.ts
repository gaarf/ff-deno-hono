import { LoremIpsum } from "@/islands/LoremIpsum.tsx";
import { Header } from "@/islands/Header.tsx";
import { BtcPrice } from "@/islands/BtcPrice.tsx";

export const mountables = { LoremIpsum, Header, BtcPrice } as const;

export type Mountable = keyof typeof mountables;
