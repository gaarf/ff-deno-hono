import { PropsWithChildren } from "@/util.ts";

export const Footer = ({ children }: PropsWithChildren) => (
  <footer class="fixed inset-0 top-auto border-t p-1 flex justify-between bg-white text-xs">
    <span>{children}</span>
    <span>&copy; Fleek Labs</span>
  </footer>
);
