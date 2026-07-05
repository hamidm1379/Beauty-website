import { prisma } from "@/lib/prisma";

export class BrandRepository {
  async findAll() {
    return prisma.brand.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        title: "asc",
      },
    });
  }

  async findById(id: number) {
    return prisma.brand.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.brand.findUnique({
      where: {
        slug,
      },
    });
  }

  async create(data: { title: string; slug: string; logo?: string }) {
    return prisma.brand.create({
      data,
    });
  }

  async update(
    id: number,
    data: Partial<{
      title: string;
      slug: string;
      logo: string;
    }>,
  ) {
    return prisma.brand.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    return prisma.brand.delete({
      where: {
        id,
      },
    });
  }

  async count() {
    return prisma.brand.count();
  }
}

export const brandRepository = new BrandRepository();
