import { Toaster as ReactHotToaster } from "react-hot-toast";
import clientOnly from "@/client/only.tsx";

export const Toaster = clientOnly(() => (
  <ReactHotToaster position="bottom-right" toastOptions={{
    className: 'border',
    style: {
      background: 'rgb(var(--color-default-bg))',
      color: 'rgb(var(--color-default-text))',
    }
  }} />
));
