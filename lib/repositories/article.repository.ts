import { prisma } from "@/lib/prisma";
import { Prisma, ArticleStatus } from "@prisma/client";

export class ArticleRepository {
  async findCategories() {
    return prisma.articleCategory.findMany({
      where: {
        slug: {
          not: "brands",
        },
      },
      orderBy: {
        title: "asc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
      },
    });
  }
  // Home
  async findHomeArticles(limit = 6) {
    return prisma.article.findMany({
      where: {
        status: "PUBLISHED",

        category: {
          is: {
            slug: {
              not: "brands",
            },
          },
        },
      },

      include: {
        category: true,
      },

      orderBy: {
        publishedAt: "desc",
      },

      take: limit,
    });
  }

  // Blog + Pagination
  async findPublished({
    page = 1,
    limit = 9,
  }: {
    page?: number;
    limit?: number;
  }) {
    const where: Prisma.ArticleWhereInput = {
      status: "PUBLISHED",

      category: {
        is: {
          slug: {
            not: "brands",
          },
        },
      },
    };

    const total = await prisma.article.count({
      where,
    });

    const items = await prisma.article.findMany({
      where,

      include: {
        category: true,
      },

      orderBy: {
        publishedAt: "desc",
      },

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

  async findBySlug(slug: string) {
    return prisma.article.findUnique({
      where: {
        slug,
      },

      include: {
        category: true,
      },
    });
  }

  async findRelated(categoryId: number, articleId: number) {
    return prisma.article.findMany({
      where: {
        status: "PUBLISHED",

        categoryId,

        NOT: {
          id: articleId,
        },
      },

      include: {
        category: true,
      },

      orderBy: {
        publishedAt: "desc",
      },

      take: 3,
    });
  }

  async findRandomPublished(excludeId: number, limit = 8) {
    const articles = await prisma.article.findMany({
      where: {
        status: "PUBLISHED",

        NOT: {
          id: excludeId,
        },

        category: {
          is: {
            slug: {
              not: "brands",
            },
          },
        },
      },

      include: {
        category: true,
      },
    });

    for (let i = articles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [articles[i], articles[j]] = [articles[j], articles[i]];
    }

    return articles.slice(0, limit);
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
      where: {
        id,
      },

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

    const where: Prisma.ArticleWhereInput = {
      category: {
        is: {
          slug: {
            not: "brands",
          },
        },
      },
    };

    if (filters.search?.trim()) {
      where.OR = [
        {
          title: {
            contains: filters.search.trim(),
          },
        },
        {
          excerpt: {
            contains: filters.search.trim(),
          },
        },
        {
          content: {
            contains: filters.search.trim(),
          },
        },
        {
          seoKeywords: {
            contains: filters.search.trim(),
          },
        },
      ];
    }

    if (filters.category) {
      where.category = {
        is: {
          slug: filters.category,
        },
      };
    } else {
      where.category = {
        is: {
          slug: {
            not: "brands",
          },
        },
      };
    }

    if (filters.status && filters.status !== "ALL") {
      where.status = filters.status as ArticleStatus;
    }

    let orderBy: Prisma.ArticleOrderByWithRelationInput;

    switch (filters.sort) {
      case "oldest":
        orderBy = {
          publishedAt: "asc",
        };
        break;

      case "views":
        orderBy = {
          views: "desc",
        };
        break;

      case "title":
        orderBy = {
          title: "asc",
        };
        break;

      default:
        orderBy = {
          publishedAt: "desc",
        };
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
  // Brands + Pagination

  async findPublishedBrands({
    page = 1,
    limit = 12,
    search,
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    const where: Prisma.ArticleWhereInput = {
      status: "PUBLISHED",

      category: {
        is: {
          slug: "brands",
        },
      },
    };

    if (search?.trim()) {
      where.OR = [
        {
          title: {
            contains: search.trim(),
          },
        },
        {
          excerpt: {
            contains: search.trim(),
          },
        },
        {
          content: {
            contains: search.trim(),
          },
        },
        {
          seoKeywords: {
            contains: search.trim(),
          },
        },
      ];
    }

    const total = await prisma.article.count({
      where,
    });

    const items = await prisma.article.findMany({
      where,

      include: {
        category: true,
      },

      orderBy: {
        publishedAt: "desc",
      },

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
  async findRelatedBrands(articleId: number, limit = 4) {
    return prisma.article.findMany({
      where: {
        status: "PUBLISHED",

        category: {
          is: {
            slug: "brands",
          },
        },

        NOT: {
          id: articleId,
        },
      },

      include: {
        category: true,
      },

      orderBy: {
        publishedAt: "desc",
      },

      take: limit,
    });
  }
}

export const articleRepository = new ArticleRepository();
