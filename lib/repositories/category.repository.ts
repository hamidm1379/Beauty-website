import { prisma } from "@/lib/prisma";

export class CategoryRepository {
  async findHomeCategories() {
    return prisma.category.findMany({
      where: {
        parentId: null,
      },
      orderBy: {
        title: "asc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        image: true,
      },
    });
  }
  async findAll() {
    return prisma.category.findMany({
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
    return prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: { title: string; slug: string; image?: string }) {
    return prisma.category.create({
      data,
    });
  }

  async update(
    id: number,
    data: Partial<{
      title: string;
      slug: string;
      image: string;
    }>,
  ) {
    return prisma.category.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    return prisma.category.delete({
      where: {
        id,
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.category.findUnique({
      where: {
        slug,
      },
    });
  }

  async count() {
    return prisma.category.count();
  }
}

export const categoryRepository = new CategoryRepository();
