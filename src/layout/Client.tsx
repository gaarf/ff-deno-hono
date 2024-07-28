import { type NamedRunner } from "@/client/runners/index.ts";

export const Client = ({ run, opts }: { run: NamedRunner; opts?: Record<string, unknown> }) => {
  return (
    <object hidden type="application/json" data-client-run={run}>
      {opts && JSON.stringify(opts)}
    </object>
  );
};

