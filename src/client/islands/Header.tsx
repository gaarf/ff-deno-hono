import { cn, type PropsWithChildren } from "@/utils.ts";
import { usePathname } from "@/server/layout/SsrContext.ts";
import { Button } from "@/components/Button.tsx";

type HeaderProps = {
  className?: string;
  fixed?: boolean;
};

export const Header = ({
  fixed,
  className = "min-h-14",
}: PropsWithChildren<HeaderProps>) => (
  <header className={cn("flex", className)}>
    <div
      className={cn(
        {
          "flex w-full items-center justify-between p-3 border-b": true,
          "fixed bg-neutral-3 z-10": fixed,
        },
        className,
      )}
    >
      <h1 className="text-center text-lg font-bold text-ellipsis whitespace-nowrap overflow-hidden">
        FUNKY FLEEK FUNCTION FRAMEWORK
      </h1>

      <nav>
        <ul className="flex gap-2">
          <NavItem href="/">Home</NavItem>
          <NavItem href="/foo">Foo</NavItem>
          <NavItem href="/bar">Bar</NavItem>
        </ul>
      </nav>
    </div>
  </header>
);

type NavItemProps = PropsWithChildren<{ href: string }>;

const NavItem = ({ href, children }: NavItemProps) => {
  const p = usePathname();
  const active = href === "/" ? href === p : p.startsWith(href);
  return (
    <li>
      <Button
        href={href}
        disabled={active}
      >
        {children}
      </Button>
    </li>
  );
};
