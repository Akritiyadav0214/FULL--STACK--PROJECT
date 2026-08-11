import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),

  email: z.string().email("Enter a valid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});