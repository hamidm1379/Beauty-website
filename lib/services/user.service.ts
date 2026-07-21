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

  // -------------------------
  // Admin: User Overview
  // -------------------------

  /**
   * آمار و آدرس‌های یک کاربر برای نمایش در صفحه‌ی ویرایش کاربر (پنل ادمین)
   */
  async getUserOverview(id: number) {
    const overview = await userRepository.getUserOverview(id);

    if (!overview) {
      throw new Error("کاربر پیدا نشد.");
    }

    return overview;
  }

  // -------------------------
  // Account Profile
  // -------------------------

  /**
   * دریافت کامل اطلاعات پنل کاربری: پروفایل، سفارش‌ها، علاقه‌مندی‌ها، آدرس‌ها و آمار
   */
  async getAccountProfile(userId: number) {
    const profile = await userRepository.findAccountProfile(userId);

    if (!profile) {
      throw new Error("کاربر پیدا نشد.");
    }

    return profile;
  }

  // -------------------------
  // Addresses
  // -------------------------

  /**
   * لیست آدرس‌های یک کاربر
   */
  async getAddresses(userId: number) {
    return userRepository.findAddressesByUser(userId);
  }

  /**
   * دریافت یک آدرس مشخص (با بررسی مالکیت کاربر)
   */
  async getAddress(id: number, userId: number) {
    const address = await userRepository.findAddressById(id, userId);

    if (!address) {
      throw new Error("آدرس پیدا نشد.");
    }

    return address;
  }

  /**
   * ایجاد آدرس جدید برای کاربر
   */
  async createAddress(
    userId: number,
    data: {
      title: string;
      receiverName: string;
      receiverPhone: string;
      province: string;
      city: string;
      postalCode: string;
      addressLine: string;
      plaque?: string | null;
      unit?: string | null;
      isDefault?: boolean;
    },
  ) {
    this.validateAddress(data);

    const existingAddresses = await userRepository.findAddressesByUser(userId);

    if (existingAddresses.length >= 4) {
      throw new Error("حداکثر تعداد آدرس مجاز (۴ آدرس) ثبت شده است.");
    }

    return userRepository.createAddress(userId, data);
  }

  /**
   * ویرایش آدرس (فقط اگر متعلق به همین کاربر باشد)
   */
  async updateAddress(
    id: number,
    userId: number,
    data: {
      title?: string;
      receiverName?: string;
      receiverPhone?: string;
      province?: string;
      city?: string;
      postalCode?: string;
      addressLine?: string;
      plaque?: string | null;
      unit?: string | null;
      isDefault?: boolean;
    },
  ) {
    await this.getAddress(id, userId);

    return userRepository.updateAddress(id, userId, data);
  }

  /**
   * حذف آدرس (فقط اگر متعلق به همین کاربر باشد)
   */
  async deleteAddress(id: number, userId: number) {
    await this.getAddress(id, userId);

    return userRepository.deleteAddress(id, userId);
  }

  /**
   * تنظیم آدرس به‌عنوان پیش‌فرض
   */
  async setDefaultAddress(id: number, userId: number) {
    await this.getAddress(id, userId);

    return userRepository.setDefaultAddress(id, userId);
  }

  private validateAddress(data: {
    receiverName: string;
    receiverPhone: string;
    province: string;
    city: string;
    addressLine: string;
  }) {
    if (!data.receiverName.trim()) {
      throw new Error("نام گیرنده الزامی است.");
    }

    if (!data.receiverPhone.trim()) {
      throw new Error("شماره موبایل گیرنده الزامی است.");
    }

    if (!data.province.trim()) {
      throw new Error("استان الزامی است.");
    }

    if (!data.city.trim()) {
      throw new Error("شهر الزامی است.");
    }

    if (!data.addressLine.trim()) {
      throw new Error("آدرس کامل الزامی است.");
    }
  }
  
}

export const userService = new UserService();
