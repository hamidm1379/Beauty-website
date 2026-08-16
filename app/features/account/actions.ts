"use server";

import { auth } from "@/lib/auth";
import { userService } from "@/lib/services/user.service";
import { otpService } from "@/lib/services/otp.service";
import { sendOtpSchema } from "@/lib/validations/auth.schema";
import { toEnglishDigits } from "@/lib/utils/normalize-digits";

export async function getAccountProfile() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return userService.getAccountProfile(Number(session.user.id));
}

export async function updateProfileAction(data: {
  firstName: string;
  lastName?: string;
  email?: string;
  username?: string;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await userService.updateUser(Number(session.user.id), data);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "خطا در بروزرسانی اطلاعات.",
    };
  }
}

export async function updateProfileCityAction(city: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const userId = Number(session.user.id);
    const addresses = await userService.getAddresses(userId);

    const defaultAddress = addresses.find((a) => a.isDefault);

    if (defaultAddress) {
      await userService.updateAddress(defaultAddress.id, userId, { city });
    } else {
      const user = await userService.getUser(userId);
      await userService.createAddress(userId, {
        title: "آدرس پیش‌فرض",
        receiverName: [user.firstName, user.lastName].filter(Boolean).join(" ") || "کاربر",
        receiverPhone: user.phone,
        province: "",
        city,
        postalCode: "",
        addressLine: "",
        isDefault: true,
      });
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "خطا در بروزرسانی شهر.",
    };
  }
}

export async function sendPhoneChangeOtpAction(phone: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const normalizedPhone = toEnglishDigits(phone);
  const parsed = sendOtpSchema.safeParse({ phone: normalizedPhone });

  if (!parsed.success) {
    return { success: false, error: "شماره موبایل نامعتبر است." };
  }

  const currentUser = await userService.getUser(Number(session.user.id));

  if (currentUser.phone === normalizedPhone) {
    return { success: false, error: "این شماره موبایل، شماره فعلی شماست." };
  }

  try {
    await userService.updateUser(Number(session.user.id), { phone: normalizedPhone });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("قبلاً ثبت شده")) {
      return { success: false, error: "این شماره موبایل قبلاً ثبت شده است." };
    }
  }

  try {
    await otpService.sendOtp(parsed.data.phone, "PHONE_CHANGE");
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "خطا در ارسال کد تایید.";
    const match = message.match(/(\d+)/);
    const retryAfter = match ? Number(match[1]) : undefined;
    return { success: false, error: message, retryAfter };
  }
}

export async function verifyPhoneChangeAction(phone: string, code: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const normalizedPhone = toEnglishDigits(phone);
  const normalizedCode = toEnglishDigits(code);

  try {
    await otpService.verifyOtp(normalizedPhone, normalizedCode, "PHONE_CHANGE");
    await userService.updateUser(Number(session.user.id), { phone: normalizedPhone });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "خطا در تایید کد.",
    };
  }
}
