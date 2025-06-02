import { z } from "zod";

export const sendMoneySchema = z.object({
  amount: z.number().min(0, "Amount must be a positive number"),
  recipientId: z.string().min(1, "Recipient ID is required"),
});

export type sendMoneyPayload = z.infer<typeof sendMoneySchema>;

export const recipientUserSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  id: z.string(),
});

export type recipientUserType = z.infer<typeof recipientUserSchema>;
