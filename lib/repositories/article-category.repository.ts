import { prisma } from "@/lib/prisma";

export class ArticleCategoryRepository {
  async findAll() {
    return prisma.articleCategory.findMany({
      include: {
        _count: {
          select: { articles: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: number) {
    return prisma.articleCategory.findUnique({
      where: {
        id,
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.articleCategory.findUnique({
      where: {
        slug,
      },
    });
  }

  async create(data: {
    title: string;
    slug: string;
    image?: string;
    seoTitle?: string;
    seoDescription?: string;
  }) {
    return prisma.articleCategory.create({
      data,
    });
  }

  async update(
    id: number,
    data: Partial<{
      title: string;
      slug: string;
      image: string;
      seoTitle: string;
      seoDescription: string;
    }>,
  ) {
    return prisma.articleCategory.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    return prisma.articleCategory.delete({
      where: {
        id,
      },
    });
  }

  async count() {
    return prisma.articleCategory.count();
  }
}

export const articleCategoryRepository = new ArticleCategoryRepository();