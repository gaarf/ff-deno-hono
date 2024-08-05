import { ComponentType, PropsWithChildren } from "@/utils.ts";
import { mountableName } from "@/client/islands/index.ts";
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

type HybridProps<T> = T & {
  slotId?: string;
  Component: ComponentType<T>;
};

export function Hybrid<T>({
  Component,
  slotId,
  ...componentProps
}: HybridProps<T>) {
  const name = mountableName(Component);
  if (!name) {
    throw new Error("Cannot mount: " + Component);
  }

  const id = slotId || `hybrid-${name}`;
  return (
    <slot id={id} className="contents">
      {/* @ts-expect-error FIXME */}
      <Component {...componentProps} />
      <ClientRun name="mount" opts={{ [`#${id}`]: [name, componentProps] }} />
    </slot>
  );
}

export function withHybrid<T>(Component: ComponentType<T>) {
  return (props: PropsWithChildren<T>) => (
    <Hybrid Component={Component} {...props} />
  );
}
