import { prisma } from "@/lib/prisma";
import { OtpType } from "@prisma/client";

interface CreateOtpParams {
  phone: string;
  code: string;
  type?: OtpType;
  expiresAt: Date;
}

/**
 * ایجاد OTP جدید
 */
export async function createOtp({
  phone,
  code,
  expiresAt,
  type = OtpType.LOGIN,
}: CreateOtpParams) {
  return prisma.otp.create({
    data: {
      phone,
      code,
      type,
      expiresAt,
    },
  });
}

/**
 * آخرین OTP معتبر کاربر
 */
export async function findLatestOtp(
  phone: string,
  type: OtpType = OtpType.LOGIN,
) {
  return prisma.otp.findFirst({
    where: {
      phone,
      type,
      used: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * مصرف شدن OTP
 */
export async function markOtpAsUsed(id: number) {
  return prisma.otp.update({
    where: {
      id,
    },
    data: {
      used: true,
    },
  });
}

/**
 * حذف OTP های منقضی شده
 */
export async function deleteExpiredOtps() {
  return prisma.otp.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });
}

/**
 * حذف OTP های قبلی یک شماره
 */
export async function deletePhoneOtps(
  phone: string,
  type: OtpType = OtpType.LOGIN,
) {
  return prisma.otp.deleteMany({
    where: {
      phone,
      type,
    },
  });
}