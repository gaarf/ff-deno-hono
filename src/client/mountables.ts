import { LoremIpsum } from "@/components/LoremIpsum.tsx";

export const mountables = { LoremIpsum } as const;

export type Mountable = keyof typeof mountables;
