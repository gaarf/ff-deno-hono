import { type Runner } from "@/client/runners/index.ts";

export const Client = ({ run, opts }: { run: Runner; opts?: Record<string, unknown> }) => {
  return (
    <object hidden type="application/json" data-client-run={run}>
      {opts && JSON.stringify(opts)}
    </object>
  );
};
