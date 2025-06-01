import { ReactNode, useState } from "react";
import { ToastItem, toastSchema, ToastType } from "../types/toast.types";
import { ToastContainer } from "../components/ToastContainer";
import { ToastContext } from "../hooks/useToastContext";

export interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (message: string, type: ToastType = "success") => {
    const result = toastSchema.safeParse({ message, type });
    if (!result.success) return;
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};
