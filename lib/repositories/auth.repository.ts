import { prisma } from "@/lib/prisma";

class AuthRepository {
  /**
   * پیدا کردن کاربر با نام کاربری
   */
  async findByUsername(username: string) {
    return prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  /**
   * پیدا کردن کاربر با ایمیل
   */
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  /**
   * پیدا کردن کاربر با شماره موبایل
   */
  async findByPhone(phone: string) {
    return prisma.user.findUnique({
      where: {
        phone,
      },
    });
  }

  /**
   * پیدا کردن کاربر با شناسه
   */
  async findById(id: number) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * بروزرسانی آخرین ورود (برای آینده)
   */
  async update(id: number, data: Parameters<typeof prisma.user.update>[0]["data"]) {
    return prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }
}

export const authRepository = new AuthRepository();