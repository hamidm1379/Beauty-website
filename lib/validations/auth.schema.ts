import { z } from "zod";

export const sendOtpSchema = z.object({
  phone: z
    .string()
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
});

export type SendOtpInput = z.infer<typeof sendOtpSchema>;

export const verifyOtpSchema = z.object({
  phone: z
    .string()
    .regex(/^09\d{9}$/),

  code: z
    .string()
    .length(6, "کد تایید باید ۶ رقم باشد"),
});

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;