import { z } from "zod";

export const verifyOtpSchema = z.object({
  email: z.email("Invalid email"),
  otp: z
    .string()
    .min(6, "OTP must be 6 characters")
    .max(6, "OTP must be 6 characters"),
  code: z.string().max(8, "Code must be 8 characters").optional(),
});

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
