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
}

export const userRepository = new UserRepository();
