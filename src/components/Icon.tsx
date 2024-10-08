import {
  FaBomb,
  FaBtc,
  FaCircleCheck,
  FaLightbulb,
  FaMessage,
  FaMoon,
  FaSpinner,
  FaTriangleExclamation,
} from "react-icons/fa6";
import { cn } from "@/utils.ts";
import { IconBaseProps, IconType } from "react-icons";
import { Intent } from "@/theme/index.ts";

function icon(
  Component: IconType,
  injectClassName?: string,
  injectProps?: IconBaseProps,
) {
  return ({ className, ...props }: { className?: string } & IconBaseProps) => (
    <span className={cn(injectClassName, className)}>
      <Component {...injectProps} {...props} />
    </span>
  );
}

export const Icon = {
  Warning: icon(FaTriangleExclamation),
  Danger: icon(FaBomb),
  Success: icon(FaCircleCheck),
  Message: icon(FaMessage),

  Spinner: icon(FaSpinner, "animate-spin"),
  Bitcoin: icon(FaBtc, undefined, {
    color: "rgb(249 115 22 / var(--tw-text-opacity))",
  }),
  ThemeDark: icon(FaMoon),
  ThemeLight: icon(FaLightbulb),
} as const;

export const IntentIcon = ({ intent }: { intent: Intent }) => {
  switch (intent) {
    case "warning":
      return <Icon.Warning className="text-warning-10" />;
    case "danger":
      return <Icon.Danger className="text-danger-10" />;
    case "success":
      return <Icon.Success className="text-success-10" />;
    case "accent":
      return <Icon.Message className="text-accent-10" />;
    case "neutral":
      return <Icon.Message className="text-neutral-7" />;
  }
};
