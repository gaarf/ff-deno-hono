import { PropsWithChildren } from "@/util.ts";
import { ClientRun } from "@/client/ClientRun.tsx";
import { mountables } from "@/client/mountables.ts";
import { type JSXNode } from "hono/jsx";

type HybridProps = PropsWithChildren<{
  id?: string;
}>;

export function Hybrid({ children, id: inputId }: HybridProps) {
  const Component = children as JSXNode;
  const [name] =
    Object.entries(mountables).find(([, v]) => v === Component.tag) || [];
  if (!name) return null;

  const id = inputId || `hybrid-${name}`;

  return (
    <div id={id} class="contents">
      {children}
      <ClientRun name="mount" opts={{ [`#${id}`]: [name, Component.props] }} />
    </div>
  );
}
