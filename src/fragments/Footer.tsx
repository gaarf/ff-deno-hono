import { PropsWithChildren } from "@/util.ts";

export const Footer = ({ children }: PropsWithChildren) => (
  <footer class="fixed inset-0 top-auto border-t p-1 flex gap-4 justify-between bg-white text-xs text-nowrap">
    <span class="text-ellipsis overflow-hidden">{children}</span>
    <span class="text-right">&copy; Fleek Labs</span>
  </footer>
);
