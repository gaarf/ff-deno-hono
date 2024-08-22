import { ToastContainer, type IconProps } from "react-toastify";
import clientOnly from "@/client/only.tsx";
import { Intent, useTheme } from "@/theme/index.ts";
import { IntentIcon } from "@/components";

const ToastIcon = ({ type }: IconProps) => {
  const intent = {
    default: null,
    error: "danger",
    info: "accent",
    success: "success",
    warning: "warning",
  }[type];

  return intent && <IntentIcon intent={intent as Intent} />;
};

export const Toaster = clientOnly(() => {
  const [theme] = useTheme(true);

  return (
    <ToastContainer position="bottom-right" theme={theme} icon={ToastIcon} />
  );
});
