"use server";

import { sendOtpSchema } from "@/lib/validations/auth.schema";
import { sendOtp } from "@/lib/services/otp.service";

export interface SendOtpState {
  success: boolean;
  message: string;
}

export async function sendOtpAction(
  _: SendOtpState,
  formData: FormData,
): Promise<SendOtpState> {
  const result = sendOtpSchema.safeParse({
    phone: formData.get("phone"),
  });

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0].message,
    };
  }

  try {
    await sendOtp(result.data.phone);

    return {
      success: true,
      message: "کد تایید ارسال شد.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "خطا در ارسال کد تایید",
    };
  }
}