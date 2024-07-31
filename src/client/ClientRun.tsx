import { ComponentType, PropsWithChildren } from "@/utils.ts";
import { mountables } from "@/islands/index.ts";
import { type JSXNode } from "hono/jsx";
import { type NamedRunner } from "@/client/runners/index.ts";

export const ClientRun = ({
  name,
  opts,
}: {
  name: NamedRunner;
  opts?: Record<string, unknown>;
}) => {
  return (
    <object hidden type="application/json" data-client-run={name}>
      {opts && JSON.stringify(opts)}
    </object>
  );
};

type HybridProps = PropsWithChildren<{
  id?: string;
}>;

export function Hybrid({ children, id: inputId }: HybridProps) {
  const Component = children as JSXNode;
  const [name] =
    Object.entries(mountables).find(([, v]) => v === Component.tag) || [];
  if (!name) {
    throw new Error("Cannot mount " + children);
  }

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
