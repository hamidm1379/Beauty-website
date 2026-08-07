import { compare } from "bcrypt";
import { UserRole } from "@prisma/client";

import { authRepository } from "@/lib/repositories/auth.repository";

class AuthService {
  /**
   * ورود مدیر
   */
  async login(username: string, password: string) {
    const user = await authRepository.findByUsername(username);

    if (!user) {
      throw new Error("نام کاربری یا رمز عبور اشتباه است.");
    }

    if (!user.password) {
      throw new Error("برای این حساب رمز عبور تعریف نشده است.");
    }

    if (!user.isActive) {
      throw new Error("حساب کاربری غیرفعال شده است.");
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.SUPPORT) {
      throw new Error("شما اجازه ورود به پنل مدیریت را ندارید.");
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new Error("نام کاربری یا رمز عبور اشتباه است.");
    }

    return {
      id: String(user.id),
      name: user.username ?? "",
      email: user.email,
      username: user.username ?? "",
      role: user.role,
      isActive: user.isActive,
    };
  }

  /**
   * دریافت کاربر
   */
  async getUser(id: number) {
    const user = await authRepository.findById(id);

    if (!user) {
      throw new Error("کاربر پیدا نشد.");
    }

    return user;
  }
}

export const authService = new AuthService();
