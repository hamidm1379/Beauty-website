import { Prisma, UserRole } from "@prisma/client";
import { hash } from "bcrypt";

import {
  GetUsersParams,
  userRepository,
} from "@/lib/repositories/user.repository";

class UserService {
  /**
   * لیست کاربران
   */
  async getUsers(params: GetUsersParams) {
    return userRepository.findMany(params);
  }

  /**
   * دریافت یک کاربر
   */
  async getUser(id: number) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new Error("کاربر پیدا نشد.");
    }

    return user;
  }

  /**
   * ایجاد کاربر
   */
  async createUser(data: Prisma.UserCreateInput) {
    const exists = await userRepository.findByPhone(data.phone);

    if (exists) {
      throw new Error("این شماره موبایل قبلاً ثبت شده است.");
    }

    if (data.email) {
      const emailExists = await userRepository.findByEmail(data.email);

      if (emailExists) {
        throw new Error("این ایمیل قبلاً ثبت شده است.");
      }
    }

    if (data.username) {
      const usernameExists = await userRepository.findByUsername(data.username);

      if (usernameExists) {
        throw new Error("نام کاربری تکراری است.");
      }
    }

    if (data.password) {
      data.password = await hash(data.password, 12);
    }

    return userRepository.create(data);
  }

  /**
   * ویرایش کاربر
   */
  async updateUser(id: number, data: Prisma.UserUpdateInput) {
    const currentUser = await userRepository.findById(id);

    if (!currentUser) {
      throw new Error("کاربر پیدا نشد.");
    }

    // Phone
    if (typeof data.phone === "string" && data.phone !== currentUser.phone) {
      const phoneExists = await userRepository.findByPhone(data.phone);

      if (phoneExists) {
        throw new Error("این شماره موبایل قبلاً ثبت شده است.");
      }
    }

    // Email
    if (typeof data.email === "string" && data.email !== currentUser.email) {
      const emailExists = await userRepository.findByEmail(data.email);

      if (emailExists) {
        throw new Error("این ایمیل قبلاً ثبت شده است.");
      }
    }

    // Username
    if (
      typeof data.username === "string" &&
      data.username !== currentUser.username
    ) {
      const usernameExists = await userRepository.findByUsername(data.username);

      if (usernameExists) {
        throw new Error("نام کاربری قبلاً ثبت شده است.");
      }
    }

    // Password
    if (typeof data.password === "string") {
      if (data.password.trim() === "") {
        delete data.password;
      } else {
        data.password = await hash(data.password, 12);
      }
    }

    return userRepository.update(id, data);
  }
  /**
   * فعال / غیرفعال کردن کاربر
   */
  async changeStatus(id: number, isActive: boolean) {
    const user = await this.getUser(id);

    if (user.role === UserRole.ADMIN && !isActive) {
      const admins = await userRepository.countAdmins();

      if (admins <= 1) {
        throw new Error("آخرین مدیر سیستم را نمی‌توان غیرفعال کرد.");
      }
    }

    return userRepository.updateStatus(id, isActive);
  }

  /**
   * تغییر نقش
   */
  async changeRole(id: number, role: UserRole) {
    const user = await this.getUser(id);

    if (user.role === UserRole.ADMIN && role === UserRole.CUSTOMER) {
      const admins = await userRepository.countAdmins();

      if (admins <= 1) {
        throw new Error("آخرین مدیر سیستم قابل تغییر نیست.");
      }
    }

    return userRepository.updateRole(id, role);
  }

  /**
   * حذف کاربر
   */
  async deleteUser(id: number) {
    const user = await this.getUser(id);

    if (user.role === UserRole.ADMIN) {
      const admins = await userRepository.countAdmins();

      if (admins <= 1) {
        throw new Error("آخرین مدیر سیستم قابل حذف نیست.");
      }
    }

    return userRepository.delete(id);
  }

  /**
   * تعداد کاربران
   */
  async countUsers() {
    return userRepository.count();
  }

  async getStats() {
    return userRepository.getStats();
  }
}

export const userService = new UserService();
