import { LoremIpsum } from "@/components/LoremIpsum.tsx";
import { Header } from "@/islands/Header.tsx";

export const mountables = { LoremIpsum, Header } as const;

export type Mountable = keyof typeof mountables;
