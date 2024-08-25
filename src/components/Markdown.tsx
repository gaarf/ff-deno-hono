import { render, CSS } from "gfm";
import { PropsWithChildren, useMemo } from "@/react.shim.ts";
import { cn, isBrowser } from "@/utils.ts";

type MarkdownProps = PropsWithChildren<{
  className?: string;
}>;


if (isBrowser()) {
  const style = document.createElement('style');
  style.innerText = CSS;
  document.head.appendChild(style);
}

export const Markdown = ({ children, className }: MarkdownProps) => {
  const markup = useMemo(() => render(children?.toString()!), [children]);
  return (
    <blockquote
      className={cn('prose', className)}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
};
