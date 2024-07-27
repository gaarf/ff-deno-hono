import { cn, useUrl, PropsWithChildren } from "@/util.ts";

type HeaderProps = {
  class?: string;
  fixed?: boolean;
};

export const Header = ({
  fixed,
  class: className = "min-h-14",
}: HeaderProps) => (
  <header class={cn("flex", className)}>
    <div
      class={cn(
        {
          "flex w-full items-center justify-between p-3 border-b": true,
          "fixed bg-white": fixed,
        },
        className
      )}
    >
      <h1 class="text-center text-lg font-bold text-ellipsis whitespace-nowrap overflow-hidden">
        FUNKY FLEEK FUNCTION FRAMEWORK
      </h1>

      <nav>
        <ul class="flex gap-2">
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
  const url = useUrl();
  const active = url.pathname === href;
  return (
    <li class="border flex rounded-full text-sm overflow-hidden">
      <a href={href} class={cn({
        'hover:bg-slate-300 px-3': true,
        'bg-yellow-100': active
      })}>{children}</a>
    </li>
  );
};
