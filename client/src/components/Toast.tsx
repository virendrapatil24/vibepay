import { ToastType } from "../types/toast.types";

interface ToastProps {
  type: ToastType;
  message: string;
}

const typeStyles = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-blue-600",
};

const Toast = ({ message, type }: ToastProps) => {
  return (
    <div
      className={`text-white px-4 py-2 rounded-lg mb-2 shadow-md ${typeStyles[type]}`}
    >
      {message}
    </div>
  );
};

export default Toast;
