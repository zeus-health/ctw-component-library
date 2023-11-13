import { ReactNode } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import { ToastContext } from "./toast-context";
import { APP_TOAST_CONTAINER_ID } from "../toast";

import "react-toastify/dist/ReactToastify.css";
import "../toast.scss";

interface ProviderProps {
  children: ReactNode;
  containerId?: string;
}

export function ToastProvider({ children, containerId }: ProviderProps) {
  return (
    <ToastContext.Provider value={undefined}>
      <ToastContainer
        className="ctw-toast-override"
        position="bottom-left"
        autoClose={4000}
        hideProgressBar
        closeOnClick
        rtl={false}
        limit={1}
        transition={Zoom}
        pauseOnFocusLoss
        pauseOnHover
        theme="colored"
        enableMultiContainer
        containerId={containerId || APP_TOAST_CONTAINER_ID}
      />
      {children}
    </ToastContext.Provider>
  );
}
