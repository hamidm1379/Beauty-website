import { UserRole } from "@prisma/client";
import { z } from "zod";

export const userSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "نام باید حداقل ۲ کاراکتر باشد.")
    .max(100, "نام نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد."),

  lastName: z
    .string()
    .trim()
    .max(100, "نام خانوادگی نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد.")
    .optional()
    .or(z.literal("")),

  username: z
    .string()
    .trim()
    .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد.")
    .max(50, "نام کاربری نمی‌تواند بیشتر از ۵۰ کاراکتر باشد.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "نام کاربری فقط می‌تواند شامل حروف انگلیسی، عدد و _ باشد."
    )
    .optional()
    .or(z.literal("")),

  email: z
    .string()
    .trim()
    .email("ایمیل معتبر نیست.")
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .trim()
    .regex(
      /^09\d{9}$/,
      "شماره موبایل معتبر نیست."
    ),

  password: z
    .string()
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد.")
    .max(100)
    .optional()
    .or(z.literal("")),

  role: z.nativeEnum(UserRole),

  isActive: z.boolean(),

  phoneVerified: z.boolean().optional(),

  emailVerified: z.boolean().optional(),

  avatar: z.string().optional().or(z.literal("")),
});
export const updateUserSchema = userSchema.extend({
  password: z
    .string()
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد.")
    .max(100)
    .optional()
    .or(z.literal("")),
});

export type UpdateUserSchema = z.infer<
  typeof updateUserSchema
>;

export type UserSchema = z.infer<typeof userSchema>;