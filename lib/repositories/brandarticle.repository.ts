import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface BrandFilters {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

interface BrandCreateInput {
  title: string;
  slug: string;
  logo?: string;
}

interface BrandUpdateInput {
  title?: string;
  slug?: string;
  logo?: string;
}

export class BrandRepository {
  // article.repository.ts

  async findBrands({
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
      where.title = {
        contains: search.trim(),
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
        products: true,
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.brand.findUnique({
      where: {
        slug,
      },
      include: {
        products: {
          where: {
            status: "ACTIVE",
          },
          include: {
            images: {
              take: 1,
            },
          },
        },
      },
    });
  }

  async create(data: BrandCreateInput) {
    return prisma.brand.create({
      data,
    });
  }

  async update(id: number, data: BrandUpdateInput) {
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

  async count(where?: Prisma.BrandWhereInput) {
    return prisma.brand.count({
      where,
    });
  }

  async filter(filters: BrandFilters) {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 12;

    const where: Prisma.BrandWhereInput = {};

    if (filters.search?.trim()) {
      where.OR = [
        {
          title: {
            contains: filters.search.trim(),
          },
        },
        {
          slug: {
            contains: filters.search.trim(),
          },
        },
      ];
    }

    let orderBy: Prisma.BrandOrderByWithRelationInput = {
      title: "asc",
    };

    switch (filters.sort) {
      case "newest":
        orderBy = {
          createdAt: "desc",
        };
        break;

      case "oldest":
        orderBy = {
          createdAt: "asc",
        };
        break;

      case "products":
        orderBy = {
          products: {
            _count: "desc",
          },
        };
        break;

      case "title":
        orderBy = {
          title: "asc",
        };
        break;
    }

    const [items, total] = await Promise.all([
      prisma.brand.findMany({
        where,

        include: {
          _count: {
            select: {
              products: true,
            },
          },
        },

        orderBy,

        skip: (page - 1) * limit,

        take: limit,
      }),

      prisma.brand.count({
        where,
      }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async search(keyword: string) {
    return prisma.brand.findMany({
      where: {
        OR: [
          {
            title: {
              contains: keyword,
            },
          },
          {
            slug: {
              contains: keyword,
            },
          },
        ],
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
}

export const brandRepository = new BrandRepository();
