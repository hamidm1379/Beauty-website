import { prisma } from "@/lib/prisma";
import { Prisma, ProductStatus } from "@prisma/client";

interface ProductFilters {
  search?: string;
  category?: string;
  brand?: string;
  status?: string;
  sort?: string;

  page?: number;
  limit?: number;
}

interface ProductCreateInput {
  title: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  thumbnail?: string;
  images?: string[];
  status?: any;
  categoryId: number;
  brandId: number;
}

interface ProductUpdateInput {
  title?: string;
  slug?: string;
  description?: string;
  price?: number;
  stock?: number;
  thumbnail?: string;
  images?: string[];
  status?: any;
  categoryId?: number;
  brandId?: number;
}

export class ProductRepository {
  async findAll() {
    return prisma.product.findMany({
      include: {
        category: true,
        brand: true,
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: number) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        images: true,
        review: true,
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        brand: true,
        images: true,
        review: true,
      },
    });
  }

  async create(data: ProductCreateInput) {
    const { images, ...productData } = data;

    return prisma.product.create({
      data: {
        ...productData,
        // اگر آرایه‌ای از URL برای گالری فرستاده شده، رکوردهای مرتبط رو هم بساز
        ...(images && images.length > 0
          ? {
              images: {
                create: images.map((image) => ({ image })),
              },
            }
          : {}),
      },
      include: {
        images: true,
      },
    });
  }

  async update(id: number, data: ProductUpdateInput) {
    const { images, ...productData } = data;

    // اگر گالری جدید فرستاده شده، اول تصاویر قبلی رو پاک کن و جدیدها رو بساز
    if (images) {
      await prisma.productImage.deleteMany({
        where: { productId: id },
      });
    }

    return prisma.product.update({
      where: { id },
      data: {
        ...productData,
        ...(images && images.length > 0
          ? {
              images: {
                create: images.map((image) => ({ image })),
              },
            }
          : {}),
      },
      include: {
        images: true,
      },
    });
  }

  async delete(id: number) {
    return prisma.product.delete({
      where: { id },
    });
  }

  async count(where?: Prisma.ProductWhereInput) {
    return prisma.product.count({
      where,
    });
  }

  async filter(filters: ProductFilters) {
    const page = filters.page ?? 1;

    const limit = filters.limit ?? 12;

    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {};

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

    if (filters.category) {
      where.categoryId = Number(filters.category);
    }

    if (filters.brand) {
      where.brandId = Number(filters.brand);
    }

    if (filters.status) {
      where.status = filters.status as ProductStatus;
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = {
      createdAt: "desc",
    };

    switch (filters.sort) {
      case "oldest":
        orderBy = {
          createdAt: "asc",
        };
        break;

      case "price-desc":
        orderBy = {
          price: "desc",
        };
        break;

      case "price-asc":
        orderBy = {
          price: "asc",
        };
        break;

      case "stock-desc":
        orderBy = {
          stock: "desc",
        };
        break;
    }

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,

        orderBy,

        skip,

        take: limit,

        include: {
          category: true,
          brand: true,
        },
      }),

      prisma.product.count({
        where,
      }),
    ]);

    return {
      items,

      total,

      page,

      totalPages: Math.ceil(total / limit),
    };
  }

  async search(keyword: string) {
    return prisma.product.findMany({
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
        category: true,
        brand: true,
      },
    });
  }
}

export const productRepository = new ProductRepository();