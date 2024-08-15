import { cn, type PropsWithChildren } from "@/utils.ts";
import { usePathname } from "@/client/SsrContext.ts";
import { Button } from "@/components/Button.tsx";
import { Container } from "@/server/layout/Container.tsx";
import { Switch as ThemeSwitch } from "@/theme/Switch.tsx";

type HeaderProps = {
  heightClass?: string;
  fixed?: boolean;
};

export const Header = ({
  fixed,
  heightClass = "min-h-12",
}: PropsWithChildren<HeaderProps>) => (
  <header className={cn("flex", heightClass)}>
    <div
      className={cn(
        "flex w-full justify-center",
        "border-b bg-neutral-3",
        {
          "fixed z-10": fixed,
        },
        heightClass,
      )}
    >
      <Container>
        <h1 className="text-center text-lg font-bold text-ellipsis whitespace-nowrap overflow-hidden">
          FUNKY FLEEK FUNCTION FRAMEWORK
        </h1>

        <nav className="flex self-stretch items-stretch gap-2">
          <ThemeSwitch />
          <ul className="flex gap-2 items-center">
            <NavItem href="/">Home</NavItem>
            <NavItem href="/test">Test</NavItem>
            <NavItem href="/auth">Login</NavItem>
          </ul>
        </nav>
      </Container>
    </div>
  </header>
);

type NavItemProps = PropsWithChildren<{ href: string }>;

const NavItem = ({ href, children }: NavItemProps) => {
  const p = usePathname();
  const active = href === "/" ? href === p : p.startsWith(href);
  return (
    <li>
      <Button href={href} disabled={active}>
        {children}
      </Button>
    </li>
  );
};
