import { cn, PropsWithChildren } from "@/utils.ts";

type FooterProps = PropsWithChildren<{
  fixed?: boolean;
}>;

export const Footer = ({ children, fixed }: FooterProps) => (
  <footer
    className={cn({
      "border-t p-1 flex gap-4 justify-between text-xs text-nowrap": true,
      "fixed inset-0 top-auto bg-neutral-8": fixed,
    })}
  >
    <span className="text-ellipsis overflow-hidden">{children}</span>
    <span className="text-right">&copy; Fleek Labs</span>
  </footer>
);
