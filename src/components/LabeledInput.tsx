import { Input } from "@/components";
import { forwardRef } from "@/react.shim.ts";
import { cn } from "@/utils.ts";

type LabeledInputProps = JSX.IntrinsicElements["input"] & {
  label: string;
};

export const LabeledInput = forwardRef<HTMLInputElement, LabeledInputProps>(
  ({ label, ...props }, ref) => {
    return (
      <label className="flex-1 flex flex-col items-start">
        <span className="text-sm">{label}</span>
        <Input {...props} className={cn("w-full", props.className)} ref={ref} />
      </label>
    );
  },
);
