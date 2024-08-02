import { cn, type PropsWithChildren } from "@/utils.ts";
import { usePathname } from "@/server/layout/SsrContext.ts";

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
          "fixed bg-white z-10": fixed,
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
    <li
      className={cn(
        "border flex rounded-full text-sm overflow-hidden",
        "focus-within:outline outline-[-webkit-focus-ring-color]",
      )}
    >
      <a
        href={href}
        className={cn({
          "px-3": true,
          "hover:bg-slate-300": !active,
          "bg-yellow-100": active,
        })}
      >
        {children}
      </a>
    </li>
  );
};
