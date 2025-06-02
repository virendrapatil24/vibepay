import { z } from "zod";

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .max(10, "Phone number must be less than 10 characters "),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type SignupFormPayload = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginFormPayload = z.infer<typeof loginSchema>;

export const userUpdateSchema = z.object({
  firstName: z
    .union([
      z.string().min(1, "First name is required").max(50, "Must be < 50 chars"),
      z.literal(""),
    ])
    .optional(),

  lastName: z
    .union([
      z.string().min(1, "Last name is required").max(50, "Must be < 50 chars"),
      z.literal(""),
    ])
    .optional(),

  password: z
    .union([
      z.string().min(6, "Password must be at least 6 characters"),
      z.literal(""),
    ])
    .optional(),
});

export type UserUpdatePayload = z.infer<typeof userUpdateSchema>;
