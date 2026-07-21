import { Prisma, UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  status?: "active" | "inactive";
  sortBy?: "createdAt" | "firstName";
  sortOrder?: "asc" | "desc";
  isActive?: boolean;
}

class UserRepository {
  async findMany({
    page = 1,
    limit = 10,
    search,
    role,
    status,
    sortBy = "createdAt",
    sortOrder = "desc",
  }: GetUsersParams) {
    const where: Prisma.UserWhereInput = {};

    if (search?.trim()) {
      where.OR = [
        {
          firstName: {
            contains: search,
          },
        },
        {
          lastName: {
            contains: search,
          },
        },
        {
          username: {
            contains: search,
          },
        },
        {
          phone: {
            contains: search,
          },
        },
        {
          email: {
            contains: search,
          },
        },
      ];
    }

    if (role) {
      where.role = role;
    }

    if (status === "active") {
      where.isActive = true;
    }

    if (status === "inactive") {
      where.isActive = false;
    }

    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        where,

        orderBy: {
          [sortBy]: sortOrder,
        },

        skip: (page - 1) * limit,

        take: limit,

        select: {
          id: true,
          username: true,

          firstName: true,
          lastName: true,

          phone: true,
          email: true,

          avatar: true,

          role: true,

          isActive: true,

          phoneVerified: true,
          emailVerified: true,

          createdAt: true,
        },
      }),

      prisma.user.count({
        where,
      }),
    ]);

    return {
      users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findByPhone(phone: string) {
    return prisma.user.findUnique({
      where: { phone },
    });
  }

  async findByUsername(username: string) {
    return prisma.user.findUnique({
      where: { username },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async updateStatus(id: number, isActive: boolean) {
    return prisma.user.update({
      where: { id },
      data: {
        isActive,
      },
    });
  }

  async updateRole(id: number, role: UserRole) {
    return prisma.user.update({
      where: { id },
      data: {
        role,
      },
    });
  }

  async delete(id: number) {
    return prisma.user.delete({
      where: { id },
    });
  }

  async count() {
    return prisma.user.count();
  }

  async countAdmins() {
    return prisma.user.count({
      where: {
        role: UserRole.ADMIN,
      },
    });
  }
  async getStats() {
    const [totalUsers, activeUsers, adminUsers, verifiedPhones] =
      await prisma.$transaction([
        prisma.user.count(),

        prisma.user.count({
          where: {
            isActive: true,
          },
        }),

        prisma.user.count({
          where: {
            role: UserRole.ADMIN,
          },
        }),

        prisma.user.count({
          where: {
            phoneVerified: true,
          },
        }),
      ]);

    return {
      totalUsers,
      activeUsers,
      adminUsers,
      verifiedPhones,
    };
  }

  // -------------------------
  // Admin: User Overview (برای صفحه‌ی ویرایش کاربر در پنل ادمین)
  // -------------------------

  async getUserOverview(id: number) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        addresses: {
          orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
        },
        _count: {
          select: {
            orders: true,
            wishlist: true,
            reviews: true,
            addresses: true,
          },
        },
      },
    });
  }

  // -------------------------
  // Account Profile
  // -------------------------

  async findAccountProfile(id: number) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        isActive: true,
        emailVerified: true,
        phoneVerified: true,
        createdAt: true,

        addresses: {
          orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
        },

        orders: {
          orderBy: { createdAt: "desc" },
          take: 10,
          include: {
            items: true,
            address: true,
          },
        },

        wishlist: {
          orderBy: { createdAt: "desc" },
          include: {
            product: {
              select: {
                id: true,
                title: true,
                slug: true,
                thumbnail: true,
                price: true,
                discountPrice: true,
                stock: true,
              },
            },
          },
        },

        _count: {
          select: {
            orders: true,
            wishlist: true,
            reviews: true,
            addresses: true,
          },
        },
      },
    });
  }

  // -------------------------
  // Addresses
  // -------------------------

  async findAddressesByUser(userId: number) {
    return prisma.address.findMany({
      where: { userId },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    });
  }

  async findAddressById(id: number, userId: number) {
    return prisma.address.findFirst({
      where: { id, userId },
    });
  }

  async createAddress(userId: number, data: Prisma.AddressCreateWithoutUserInput) {
    if (data.isDefault) {
      await prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }

    return prisma.address.create({
      data: {
        ...data,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async updateAddress(
    id: number,
    userId: number,
    data: Prisma.AddressUpdateInput,
  ) {
    if (data.isDefault) {
      await prisma.address.updateMany({
        where: { userId, NOT: { id } },
        data: { isDefault: false },
      });
    }

    return prisma.address.update({
      where: { id },
      data,
    });
  }

  async deleteAddress(id: number, userId: number) {
    const address = await this.findAddressById(id, userId);

    if (!address) {
      throw new Error("آدرس پیدا نشد.");
    }

    await prisma.address.delete({ where: { id } });

    if (address.isDefault) {
      const remaining = await prisma.address.findFirst({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });

      if (remaining) {
        await prisma.address.update({
          where: { id: remaining.id },
          data: { isDefault: true },
        });
      }
    }

    return true;
  }

  async setDefaultAddress(id: number, userId: number) {
    await prisma.address.updateMany({
      where: { userId },
      data: { isDefault: false },
    });

    return prisma.address.update({
      where: { id },
      data: { isDefault: true },
    });
  }
  
}

export const userRepository = new UserRepository();