import { cn, PropsWithChildren } from "@/util.ts";

type FooterProps = PropsWithChildren<{
  fixed?: boolean;
}>;

export const Footer = ({ children, fixed }: FooterProps) => (
  <footer class={cn({
    'border-t p-1 flex gap-4 justify-between text-xs text-nowrap': true,
    'fixed inset-0 top-auto bg-white': fixed
  })}>
    <span class="text-ellipsis overflow-hidden">{children}</span>
    <span class="text-right">&copy; Fleek Labs</span>
  </footer>
);
