import { ComponentType, PropsWithChildren } from "@/utils.ts";
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
  if (!name) {
    throw new Error("Cannot mount "+children);
  };

  const id = inputId || `hybrid-${name}`;

  return (
    <slot id={id} class="contents">
      {children}
      <ClientRun name="mount" opts={{ [`#${id}`]: [name, Component.props] }} />
    </slot>
  );
}

export function withHybrid<T>(Component: ComponentType<T>) {
  return (props: PropsWithChildren<T>) => (
    <Hybrid>
      <Component {...props} />
    </Hybrid>
  );
}
