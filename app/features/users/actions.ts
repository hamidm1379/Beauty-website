"use server";

import { sendOtpSchema } from "@/lib/validations/auth.schema";
import { otpService } from "@/lib/services/otp.service";
import { toEnglishDigits } from "@/lib/utils/normalize-digits";
import { getErrorMessage } from "@/lib/utils/errors";

export async function sendOtpAction(data: { phone: string }) {
  const normalizedPhone = toEnglishDigits(data.phone);

  const parsed = sendOtpSchema.safeParse({ phone: normalizedPhone });

  if (!parsed.success) {
    return {
      success: false,
      error: "شماره موبایل نامعتبر است.",
    };
  }

  try {
    await otpService.sendOtp(parsed.data.phone);

    return {
      success: true,
    };
  } catch (error) {
    const message: string = getErrorMessage(error) ?? "خطا در ارسال کد تایید.";

    // استخراج عدد ثانیه از پیام محدودیت زمانی، برای نمایش تایمر در فرم
    const match = message.match(/(\d+)/);
    const retryAfter = match ? Number(match[1]) : undefined;

    return {
      success: false,
      error: message,
      retryAfter,
    };
  }
}