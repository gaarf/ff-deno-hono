import { ToastContainer, type IconProps } from "react-toastify";
import clientOnly from "@/client/only.tsx";
import { Intent, useTheme } from "@/theme/index.ts";
import { IntentIcon } from "@/components";

const ToastIcon = ({ type }: IconProps) => {
  return (
    <IntentIcon
      intent={
        {
          error: "danger",
          info: "accent",
          default: "neutral",
          success: "success",
          warning: "warning",
        }[type] as Intent
      }
    />
  );
};

export const Toaster = clientOnly(() => {
  const [theme] = useTheme(true);

  return (
    <ToastContainer position="bottom-right" theme={theme} icon={ToastIcon} />
  );
});
