import { cn, type PropsWithChildren } from "@/utils.ts";
import { usePathname } from "@/server/layout/SsrContext.ts";
import { Button } from "@/components/Button.tsx";
import { Container } from "@/server/layout/Container.tsx";
import { Switch as ThemeSwitch } from "@/theme/Switch.tsx";
import { Box } from "@/components";
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

        <nav className="flex self-stretch items-stretch">
          <ul className="flex gap-2 items-center">
            <NavItem href="/">Home</NavItem>
            <NavItem href="/foo">Foo</NavItem>
            <NavItem href="/bar">Bar</NavItem>
          </ul>
          <Box className="border-l self-stretch ml-2" />
          <ThemeSwitch />
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
