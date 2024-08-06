import { FaBtc, FaSpinner } from "react-icons/fa6";
import { cn } from "@/utils.ts";
import { IconBaseProps, IconType } from "react-icons";

function icon(
  Icon: IconType,
  injectClassName?: string,
  injectProps?: IconBaseProps
) {
  return ({ className, ...props }: { className?: string } & IconBaseProps) => (
    <span className={cn(injectClassName, className)}>
      <Icon {...injectProps} {...props} />
    </span>
  );
}

export default {
  Spinner: icon(FaSpinner, "animate-spin"),
  Bitcoin: icon(FaBtc, undefined, { color: "rgb(249 115 22 / var(--tw-text-opacity))" }),
};
