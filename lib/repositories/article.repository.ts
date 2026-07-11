import { prisma } from "@/lib/prisma";
import { Prisma, ArticleStatus } from "@prisma/client";

export class ArticleRepository {
  async findBySlug(slug: string) {
    return prisma.article.findUnique({
      where: {
        slug,
      },
    });
  }
  async findAll() {
    return prisma.article.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: number) {
    return prisma.article.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  async findFiltered(filters: {
    search?: string;
    category?: string;
    status?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }) {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;

    const where: Prisma.ArticleWhereInput = {};

    // Search
    if (filters.search) {
      where.OR = [
        {
          title: {
            contains: filters.search,
          },
        },
        {
          slug: {
            contains: filters.search,
          },
        },
      ];
    }

    // Category
    if (filters.category) {
      where.categoryId = Number(filters.category);
    }

    // Status
    if (filters.status && filters.status !== "ALL") {
      where.status = filters.status as ArticleStatus;
    }

    // Sort
    let orderBy: Prisma.ArticleOrderByWithRelationInput = {
      createdAt: "desc",
    };

    switch (filters.sort) {
      case "oldest":
        orderBy = {
          createdAt: "asc",
        };
        break;

      case "title":
        orderBy = {
          title: "asc",
        };
        break;

      case "views":
        orderBy = {
          views: "desc",
        };
        break;
    }

    const total = await prisma.article.count({
      where,
    });

    const items = await prisma.article.findMany({
      where,

      include: {
        category: true,
      },

      orderBy,

      skip: (page - 1) * limit,

      take: limit,
    });

    return {
      items,

      total,

      page,

      limit,

      totalPages: Math.ceil(total / limit),
    };
  }

  async getStatistics() {
    const [totalArticles, publishedArticles, draftArticles, views] =
      await Promise.all([
        prisma.article.count(),

        prisma.article.count({
          where: {
            status: "PUBLISHED",
          },
        }),

        prisma.article.count({
          where: {
            status: "DRAFT",
          },
        }),

        prisma.article.aggregate({
          _sum: {
            views: true,
          },
        }),
      ]);

    return {
      totalArticles,

      publishedArticles,

      draftArticles,

      totalViews: views._sum.views ?? 0,
    };
  }

  async create(data: Prisma.ArticleCreateInput) {
    return prisma.article.create({
      data,
    });
  }

  async update(id: number, data: Prisma.ArticleUpdateInput) {
    return prisma.article.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    return prisma.article.delete({
      where: {
        id,
      },
    });
  }

  async count() {
    return prisma.article.count();
  }

  async increaseViews(id: number) {
    return prisma.article.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  }
}

export const articleRepository = new ArticleRepository();
