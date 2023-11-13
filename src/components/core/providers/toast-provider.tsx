import { ReactNode } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import { ToastContext } from "./toast-context";

import "react-toastify/dist/ReactToastify.css";
import "../toast.scss";

interface ProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ProviderProps) {
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
      />
      {children}
    </ToastContext.Provider>
  );
}
