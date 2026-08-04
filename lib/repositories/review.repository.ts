import { prisma } from "@/lib/prisma";

class ReviewRepository {
  async findMany({
    page = 1,
    limit = 20,
    isApproved,
  }: {
    page?: number;
    limit?: number;
    isApproved?: boolean;
  }) {
    const where = isApproved !== undefined ? { isApproved } : {};

    const [items, total] = await prisma.$transaction([
      prisma.review.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              phone: true,
            },
          },
          product: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
        },
      }),
      prisma.review.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: number) {
    return prisma.review.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
        product: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });
  }

  async approve(id: number) {
    return prisma.review.update({
      where: { id },
      data: { isApproved: true },
    });
  }

  async reject(id: number) {
    return prisma.review.update({
      where: { id },
      data: { isApproved: false },
    });
  }

  async delete(id: number) {
    return prisma.review.delete({
      where: { id },
    });
  }

  async countPending() {
    return prisma.review.count({
      where: { isApproved: false },
    });
  }

  async findApprovedByProduct(productId: number) {
    return prisma.review.findMany({
      where: { productId, isApproved: true },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
  }
}

export const reviewRepository = new ReviewRepository();
