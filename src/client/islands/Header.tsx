import { cn, type PropsWithChildren } from "@/utils.ts";
import { usePathname, useSsrContext } from "@/client/SsrContext.ts";
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
}: PropsWithChildren<HeaderProps>) => {
  const ssr = useSsrContext();

  return (
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
          <h1 className="text-center text-lg font-bold text-ellipsis whitespace-nowrap overflow-hidden uppercase">
            {ssr.title || "Welcome"}
          </h1>

          <nav className="flex items-center gap-2">
            <ThemeSwitch />
            <ul className="flex gap-2 items-center">
              <NavItem href="/">Home</NavItem>
              <NavItem href="/test">Test</NavItem>
              {ssr.user
                ? <NavItem href="/auth/logout">Logout</NavItem>
                : <NavItem href="/auth/login">Login</NavItem>}
            </ul>
          </nav>
        </Container>
      </div>
    </header>
  );
};

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
