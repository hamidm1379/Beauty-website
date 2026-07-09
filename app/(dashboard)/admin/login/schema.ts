import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "نام کاربری الزامی است.")
    .min(3, "نام کاربری حداقل ۳ کاراکتر باشد."),

  password: z
    .string()
    .min(1, "رمز عبور الزامی است.")
    .min(6, "رمز عبور حداقل ۶ کاراکتر باشد."),
});

export type LoginFormData = z.infer<typeof loginSchema>;