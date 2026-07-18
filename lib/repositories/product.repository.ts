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
  status?: ProductStatus;
  categoryId: number;
  brandId: number;
  discountPrice?: number | null;
  shortDescription?: string | null;
}

interface ProductUpdateInput {
  title?: string;
  slug?: string;
  description?: string;
  price?: number;
  stock?: number;
  thumbnail?: string;
  images?: string[];
  status?: ProductStatus;
  categoryId?: number;
  brandId?: number;
  discountPrice?: number | null;
  shortDescription?: string | null;
}

// helper مشترک برای ساخت شرط OR جستجو، بجای تکرار در filter() و search()
function buildSearchWhere(keyword: string): Prisma.ProductWhereInput {
  return {
    OR: [
      { title: { contains: keyword } },
      { slug: { contains: keyword } },
    ],
  };
}

// validate امن status ورودی از کوئری‌استرینگ، قبل از هر کست
function parseProductStatus(value?: string): ProductStatus | undefined {
  if (!value) return undefined;

  const validValues = Object.values(ProductStatus) as string[];

  if (!validValues.includes(value)) {
    throw new Error(`Invalid product status: ${value}`);
  }

  return value as ProductStatus;
}

export class ProductRepository {
  /**
   * قبلاً: همه محصولات ACTIVE از دیتابیس می‌اومدن بیرون و توی JS شافل می‌شدن.
   * الان: فقط تعداد کل رو می‌گیریم، skip های رندوم می‌سازیم و با یک کوئری
   * targeted محصولات مربوطه رو می‌گیریم. اگه دیتابیس Postgres باشه راه بهتر
   * استفاده از `ORDER BY RANDOM()` با $queryRaw است، ولی این نسخه فارغ از
   * نوع دیتابیس کار می‌کنه و نیازی به raw query نداره.
   */
  async findRandomPublished(excludeId: number, limit = 8) {
    const where: Prisma.ProductWhereInput = {
      status: ProductStatus.ACTIVE,
      NOT: { id: excludeId },
    };

    const total = await prisma.product.count({ where });

    if (total === 0) return [];

    const take = Math.min(limit, total);

    // یک skip تصادفی انتخاب می‌کنیم طوری که بتونیم `take` آیتم پشت سرهم بگیریم
    const maxSkip = Math.max(total - take, 0);
    const skip = Math.floor(Math.random() * (maxSkip + 1));

    const products = await prisma.product.findMany({
      where,
      skip,
      take,
      include: {
        category: true,
        brand: true,
        images: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    // شافل نهایی روی همون batch کوچیک (ارزون، چون فقط `take` آیتم داریم نه کل جدول)
    for (let i = products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [products[i], products[j]] = [products[j], products[i]];
    }

    return products;
  }

  async findRelated(categoryId: number, productId: number, limit = 4) {
    return prisma.product.findMany({
      where: {
        status: ProductStatus.ACTIVE,
        categoryId,
        NOT: { id: productId },
      },
      include: {
        category: true,
        brand: true,
        images: {
          orderBy: { sortOrder: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  async findPublished({
    page = 1,
    limit = 12,
  }: {
    page?: number;
    limit?: number;
  }) {
    const where: Prisma.ProductWhereInput = {
      status: ProductStatus.ACTIVE,
    };

    const total = await prisma.product.count({ where });

    const items = await prisma.product.findMany({
      where,
      include: {
        brand: true,
        category: true,
        images: true,
      },
      orderBy: { createdAt: "desc" },
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

  async findBestSellers(limit = 12) {
    return prisma.product.findMany({
      where: {
        status: ProductStatus.ACTIVE,
      },
      orderBy: { soldCount: "desc" },
      take: limit,
      include: {
        brand: {
          select: { title: true },
        },
      },
    });
  }

  async findLatestProducts(limit = 10) {
    return prisma.product.findMany({
      where: {
        status: ProductStatus.ACTIVE,
      },
      include: {
        category: true,
        brand: true,
        images: {
          take: 1,
          orderBy: { sortOrder: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  /**
   * قبلاً بدون pagination بود و می‌تونست کل جدول رو بکشه بیرون.
   * حالا pagination اختیاری داره؛ اگه page/limit پاس داده نشه رفتار قبلی حفظ میشه
   * (برای جلوگیری از breaking change در جاهایی که همه رو نیاز دارن).
   */
  async findAll(params?: { page?: number; limit?: number }) {
    if (!params) {
      return prisma.product.findMany({
        include: {
          category: true,
          brand: true,
          images: true,
        },
        orderBy: { createdAt: "desc" },
      });
    }

    const { page = 1, limit = 50 } = params;

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        include: {
          category: true,
          brand: true,
          images: true,
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count(),
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
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        images: {
          orderBy: { sortOrder: "asc" },
        },
        review: {
          where: { isApproved: true },
          orderBy: { createdAt: "desc" },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        brand: true,
        variants:true,
        images: {
          orderBy: { sortOrder: "asc" },
        },
        review: {
          where: { isApproved: true },
          orderBy: { createdAt: "desc" },
          include: {
            user: {
              select: { username: true },
            },
          },
        },
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

  /**
   * قبلاً: deleteMany و update در دو query جدا اجرا می‌شدن. اگه update به هر
   * دلیلی fail می‌شد (مثلاً یه فیلد نامعتبر)، تصاویر قبلی از دست می‌رفتن ولی
   * جدیدها ساخته نمی‌شدن. حالا هر دو عملیات داخل یک $transaction هستن که
   * atomic اجرا میشن (یا هر دو موفق، یا هر دو rollback).
   */
  async update(id: number, data: ProductUpdateInput) {
    const { images, ...productData } = data;

    return prisma.$transaction(async (tx) => {
      if (images) {
        await tx.productImage.deleteMany({
          where: { productId: id },
        });
      }

      return tx.product.update({
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
    });
  }

  async delete(id: number) {
    return prisma.product.delete({
      where: { id },
    });
  }

  async count(where?: Prisma.ProductWhereInput) {
    return prisma.product.count({ where });
  }

  async filter(filters: ProductFilters) {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 12;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {};

    if (filters.search) {
      where.OR = buildSearchWhere(filters.search).OR;
    }

    if (filters.category) {
      where.category = {
        is: { slug: filters.category },
      };
    }

    if (filters.brand) {
      where.brand = {
        is: { slug: filters.brand },
      };
    }

    // قبلاً: `filters.status as ProductStatus` بدون validation، که با یک
    // مقدار نامعتبر از کوئری‌استرینگ می‌تونست باعث خطای غیرمنتظره Prisma بشه.
    const parsedStatus = parseProductStatus(filters.status);
    if (parsedStatus) {
      where.status = parsedStatus;
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = {
      createdAt: "desc",
    };

    switch (filters.sort) {
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
      case "price-desc":
        orderBy = { price: "desc" };
        break;
      case "price-asc":
        orderBy = { price: "asc" };
        break;
      case "stock-desc":
        orderBy = { stock: "desc" };
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
          images: {
            orderBy: { sortOrder: "asc" },
          },
        },
      }),
      prisma.product.count({ where }),
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
    return prisma.product.findMany({
      where: buildSearchWhere(keyword),
      include: {
        category: true,
        brand: true,
        images: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });
  }

  async getStatistics() {
    const [totalProducts, activeProducts, inactiveProducts, draftProducts] =
      await Promise.all([
        prisma.product.count(),
        prisma.product.count({ where: { status: ProductStatus.ACTIVE } }),
        prisma.product.count({ where: { status: ProductStatus.INACTIVE } }),
        prisma.product.count({ where: { status: ProductStatus.DRAFT } }),
      ]);

    return {
      totalProducts,
      activeProducts,
      inactiveProducts,
      draftProducts,
    };
  }
}

export const productRepository = new ProductRepository();