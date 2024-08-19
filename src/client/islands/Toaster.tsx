import { ToastContainer } from "react-toastify";
import clientOnly from "@/client/only.tsx";
import { useTheme } from "@/theme/index.ts";

export const Toaster = clientOnly(() => {
  const [theme] = useTheme(true);

  return (
    <ToastContainer
      position="bottom-right"
      theme={theme}
    />
  )
});
