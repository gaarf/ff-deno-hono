import { render } from "gfm";
import { PropsWithChildren, useMemo } from "@/react.shim.ts";
import { cn } from "@/utils.ts";
import { useTheme } from "@/theme/index.ts";

type MarkdownProps = PropsWithChildren<{
  className?: string;
}>;

export const Markdown = ({ children, className }: MarkdownProps) => {
  const markup = useMemo(() => render(children?.toString()!), [children]);
  const [theme] = useTheme(true);
  return (
    <blockquote
      data-color-mode={theme}
      data-light-theme="light"
      data-dark-theme="dark"
      className={cn("markdown-body p-6", className)}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
};
