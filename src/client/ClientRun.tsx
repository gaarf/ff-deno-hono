import { type NamedRunner } from "@/client/runners/index.ts";

export const ClientRun = ({ name, opts }: { name: NamedRunner; opts?: Record<string, unknown> }) => {
  return (
    <object hidden type="application/json" data-client-run={name}>
      {opts && JSON.stringify(opts)}
    </object>
  );
};

