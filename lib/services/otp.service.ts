import { OtpType } from "@prisma/client";

import {
  createOtp,
  findLatestOtp,
  markOtpAsUsed,
  deletePhoneOtps,
} from "@/lib/repositories/otp.repository";
import { sendOtpSms } from "@/lib/sms/kavenegar";

const OTP_LENGTH = 5;
const OTP_EXPIRE_MINUTES = 2;
const RESEND_COOLDOWN_SECONDS = 90;

function generateCode() {
  const min = 10 ** (OTP_LENGTH - 1);
  const max = 10 ** OTP_LENGTH - 1;
  return String(Math.floor(min + Math.random() * (max - min + 1)));
}

function normalizePhone(phone: string) {
  return phone.trim();
}

class OtpService {
  /**
   * ارسال کد تایید به شماره موبایل (با محدودیت زمانی بین دو ارسال)
   */
  async sendOtp(phone: string, type: OtpType = OtpType.LOGIN) {
    const normalizedPhone = normalizePhone(phone);

    const latest = await findLatestOtp(normalizedPhone, type);

    if (latest) {
      const secondsSinceLastSend =
        (Date.now() - new Date(latest.createdAt).getTime()) / 1000;

      if (secondsSinceLastSend < RESEND_COOLDOWN_SECONDS) {
        const remaining = Math.ceil(
          RESEND_COOLDOWN_SECONDS - secondsSinceLastSend,
        );

        throw new Error(
          `لطفاً ${remaining} ثانیه دیگر مجدداً تلاش کنید.`,
        );
      }
    }

    const code = generateCode();
    const expiresAt = new Date(Date.now() + OTP_EXPIRE_MINUTES * 60 * 1000);

    // پاک کردن کدهای قبلی این شماره قبل از ساخت کد جدید
    await deletePhoneOtps(normalizedPhone, type);

    await createOtp({
      phone: normalizedPhone,
      code,
      type,
      expiresAt,
    });

    await sendOtpSms(normalizedPhone, code);

    return { success: true };
  }

  /**
   * اعتبارسنجی کد وارد شده (بدون مصرف کردن آن - برای استفاده در authorize)
   */
  async verifyOtp(phone: string, code: string, type: OtpType = OtpType.LOGIN) {
    const normalizedPhone = normalizePhone(phone);

    const otp = await findLatestOtp(normalizedPhone, type);

    if (!otp) {
      throw new Error("کد تایید یافت نشد. لطفاً دوباره درخواست دهید.");
    }

    if (otp.expiresAt < new Date()) {
      throw new Error("کد تایید منقضی شده است.");
    }

    if (otp.code !== code.trim()) {
      throw new Error("کد تایید نادرست است.");
    }

    await markOtpAsUsed(otp.id);

    return true;
  }
}

export const otpService = new OtpService();