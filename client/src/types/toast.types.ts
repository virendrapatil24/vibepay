import { z } from "zod";

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

export const toastSchema = z.object({
  message: z.string().min(1),
  type: z.enum(["success", "error", "info"]),
});
