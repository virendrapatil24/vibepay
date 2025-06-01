import type { ToastItem } from "../types/toast.types";
import Toast from "./Toast";

interface ToastContainerProps {
  toasts: ToastItem[];
}

export const ToastContainer = ({ toasts }: ToastContainerProps) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} type={toast.type} />
      ))}
    </div>
  );
};
