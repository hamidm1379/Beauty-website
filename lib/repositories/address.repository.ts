import { prisma } from "@/lib/prisma";

interface AddressCreateInput {
  userId: number;
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
}

interface AddressUpdateInput {
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
}

class AddressRepository {
  async findByUser(userId: number) {
    return prisma.address.findMany({
      where: {
        userId,
      },
      orderBy: [
        {
          isDefault: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
    });
  }

  async findById(id: number, userId: number) {
    return prisma.address.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async create(data: AddressCreateInput) {
    if (data.isDefault) {
      await prisma.address.updateMany({
        where: {
          userId: data.userId,
        },
        data: {
          isDefault: false,
        },
      });
    }

    return prisma.address.create({
      data,
    });
  }

  async update(
    id: number,
    userId: number,
    data: AddressUpdateInput,
  ) {
    if (data.isDefault) {
      await prisma.address.updateMany({
        where: {
          userId,
        },
        data: {
          isDefault: false,
        },
      });
    }

    return prisma.address.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number, userId: number) {
    return prisma.address.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }

  async setDefault(id: number, userId: number) {
    await prisma.address.updateMany({
      where: {
        userId,
      },
      data: {
        isDefault: false,
      },
    });

    return prisma.address.update({
      where: {
        id,
      },
      data: {
        isDefault: true,
      },
    });
  }
}

export const addressRepository = new AddressRepository();