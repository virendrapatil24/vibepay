import { createContext, useContext } from "react";
import { ToastContextType } from "../context/ToastContext";

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
