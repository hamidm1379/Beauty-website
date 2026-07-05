import { prisma } from "@/lib/prisma";

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
        reviews: true,
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
        reviews: true,
      },
    });
  }

  async create(data: {
    title: string;
    slug: string;
    description?: string;
    price: number;
    stock: number;
    image?: string;
    status?: any;
    categoryId: number;
    brandId: number;
  }) {
    return prisma.product.create({
      data,
    });
  }

  async update(
    id: number,
    data: Partial<{
      title: string;
      slug: string;
      description: string;
      price: number;
      stock: number;
      image: string;
      status: any;
      categoryId: number;
      brandId: number;
    }>
  ) {
    return prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.product.delete({
      where: { id },
    });
  }

  async count() {
    return prisma.product.count();
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