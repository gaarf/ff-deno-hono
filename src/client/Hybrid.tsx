import { PropsWithChildren } from "@/util.ts";
import { ClientRun } from "@/client/ClientRun.tsx";
import { mountables } from "@/client/mountables.ts";
import { JSXNode } from "jsr:@hono/hono@^4.5.1/jsx";

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
    <slot id={id}>
      {children}
      <ClientRun name="mount" opts={{ [`#${id}`]: [name, Component.props] }} />
    </slot>
  );
}
