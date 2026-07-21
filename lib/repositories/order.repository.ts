import { prisma } from "@/lib/prisma";

class OrderRepository {
  async create(data: any) {
    return prisma.order.create({
      data,

      include: {
        items: true,
        address: true,
      },
    });
  }

  async findByUserId(userId: number) {
    return prisma.order.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: "desc",
      },

      include: {
        items: {
          include: {
            product: true,
          },
        },

        address: true,
      },
    });
  }

  async findById(id: number) {
    return prisma.order.findUnique({
      where: {
        id,
      },

      include: {
        items: {
          include: {
            product: true,
          },
        },

        address: true,
      },
    });
  }
}

export const orderRepository = new OrderRepository();
