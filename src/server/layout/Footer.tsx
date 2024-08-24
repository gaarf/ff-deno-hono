import { cn, PropsWithChildren } from "@/utils.ts";
import { Container } from "@/server/layout/Container.tsx";

type FooterProps = PropsWithChildren<{
  fixed?: boolean;
}>;

export const Footer = ({ children, fixed }: FooterProps) => (
  <footer
    className={cn(
      "border-t border-neutral-2 shadow-inner bg-neutral-1",
      "flex justify-center text-nowrap",
      {
        "fixed inset-0 top-auto": fixed,
      },
    )}
  >
    <Container className="text-xs leading-loose">
      <span className="text-ellipsis overflow-hidden">{children}</span>
      <span className="text-right">github.com/gaarf/ff-deno-hono</span>
    </Container>
  </footer>
);
