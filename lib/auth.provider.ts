import Credentials from "next-auth/providers/credentials";

import { authService } from "@/lib/services/auth.service";
import { authRepository } from "@/lib/repositories/auth.repository";
import { otpService } from "@/lib/services/otp.service";
import { prisma } from "@/lib/prisma";
import { toEnglishDigits } from "@/lib/utils/normalize-digits";

export const credentialsProvider = Credentials({
  id: "admin-login",

  name: "Admin Login",

  credentials: {
    username: {
      label: "Username",
      type: "text",
    },

    password: {
      label: "Password",
      type: "password",
    },
  },

  async authorize(credentials) {
    if (!credentials?.username || !credentials?.password) {
      return null;
    }

    try {
      return await authService.login(
        credentials.username as string,
        credentials.password as string
      );
    } catch {
      return null;
    }
  },
});

export const otpCredentialsProvider = Credentials({
  id: "otp-login",

  name: "OTP Login",

  credentials: {
    phone: {
      label: "Phone",
      type: "text",
    },

    code: {
      label: "Code",
      type: "text",
    },
  },

  async authorize(credentials) {
    if (!credentials?.phone || !credentials?.code) {
      return null;
    }

    const phone = toEnglishDigits((credentials.phone as string).trim());
    const code = toEnglishDigits((credentials.code as string).trim());

    try {
      await otpService.verifyOtp(phone, code);
    } catch {
      return null;
    }

    let user = await authRepository.findByPhone(phone);

    if (!user) {
      // اولین ورود با این شماره → ثبت‌نام خودکار
      user = await prisma.user.create({
        data: {
          firstName: "کاربر",
          phone,
          phoneVerified: true,
        },
      });
    } else if (!user.phoneVerified) {
      user = await authRepository.update(user.id, { phoneVerified: true });
    }

    if (!user.isActive) {
      return null;
    }

    return {
      id: String(user.id),
      username: user.username ?? undefined,
      role: user.role,
      isActive: user.isActive,
      name: user.firstName,
      phone: user.phone,
    };
  },
});