import { Toaster as ReactHotToaster } from "react-hot-toast";
import clientOnly from "@/client/only.tsx";

export const Toaster = clientOnly(() => (
  <ReactHotToaster position="bottom-right" />
));
