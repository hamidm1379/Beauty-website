import bcrypt from "bcrypt";
import { OtpType } from "@prisma/client";

import * as otpRepository from "@/lib/repositories/otp.repository";

/**
 * تولید کد ۶ رقمی
 */
function generateOtpCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * ایجاد و ذخیره OTP
 */
export async function sendOtp(
  phone: string,
  type: OtpType = OtpType.LOGIN,
) {
  // حذف OTPهای قبلی این شماره
  await otpRepository.deletePhoneOtps(phone, type);

  // تولید کد
  const code = generateOtpCode();

  // هش کردن کد
  const hashedCode = await bcrypt.hash(code, 10);

  // زمان انقضا (۲ دقیقه)
  const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

  // ذخیره در دیتابیس
  await otpRepository.createOtp({
    phone,
    code: hashedCode,
    type,
    expiresAt,
  });

  // فعلاً فقط برای تست
  console.log("OTP:", code);

  return {
    success: true,
    expiresAt,
  };
}

/**
 * بررسی کد OTP
 */
export async function verifyOtp(
  phone: string,
  code: string,
  type: OtpType = OtpType.LOGIN,
) {
  const otp = await otpRepository.findLatestOtp(phone, type);

  if (!otp) {
    throw new Error("کد تأیید یافت نشد.");
  }

  if (otp.used) {
    throw new Error("این کد قبلاً استفاده شده است.");
  }

  if (otp.expiresAt < new Date()) {
    throw new Error("کد تأیید منقضی شده است.");
  }

  const isValid = await bcrypt.compare(code, otp.code);

  if (!isValid) {
    throw new Error("کد تأیید نامعتبر است.");
  }

  await otpRepository.markOtpAsUsed(otp.id);

  return true;
}