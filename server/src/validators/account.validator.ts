import { z } from "zod";

export const sendMoneyValidator = z.object({
  amount: z.number().min(0, "Amount must be a positive number"),
  recipientId: z.string().min(1, "Recipient ID is required"),
});
