import { prisma } from "@/lib/prisma";

interface ContactMessageCreateInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

class ContactRepository {
  async create(data: ContactMessageCreateInput) {
    return prisma.contactMessage.create({
      data,
    });
  }

  async findMany({ page = 1, limit = 20 }: { page?: number; limit?: number }) {
    const [items, total] = await prisma.$transaction([
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.contactMessage.count(),
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
    return prisma.contactMessage.findUnique({
      where: { id },
    });
  }

  async markAsRead(id: number) {
    return prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async delete(id: number) {
    return prisma.contactMessage.delete({
      where: { id },
    });
  }

  async countUnread() {
    return prisma.contactMessage.count({
      where: { isRead: false },
    });
  }
}

export const contactRepository = new ContactRepository();