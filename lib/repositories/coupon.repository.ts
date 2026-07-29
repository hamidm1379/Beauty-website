import { prisma } from "@/lib/prisma";
import { CouponType } from "@prisma/client";

interface CouponCreateInput {
  code: string;
  title?: string;
  description?: string;
  type: CouponType;
  value: number;
  minimumPurchase?: number | null;
  maximumDiscount?: number | null;
  usageLimit?: number | null;
  isActive?: boolean;
  startsAt?: Date | null;
  expiresAt?: Date | null;
}

export class CouponRepository {
  async create(data: CouponCreateInput) {
    return prisma.coupon.create({ data });
  }

  async findByCode(code: string) {
    return prisma.coupon.findUnique({ where: { code } });
  }

  async findById(id: number) {
    return prisma.coupon.findUnique({ where: { id } });
  }

  async findAll(params?: { page?: number; limit?: number }) {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 20;

    const [items, total] = await Promise.all([
      prisma.coupon.findMany({
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.coupon.count(),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(id: number, data: Partial<CouponCreateInput>) {
    return prisma.coupon.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.coupon.delete({ where: { id } });
  }
}

export const couponRepository = new CouponRepository();