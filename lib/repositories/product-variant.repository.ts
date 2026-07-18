import { prisma } from "@/lib/prisma";


class ProductVariantRepository {
  createMany(
    productId: number,
    variants: {
      title: string;
      price?: number;
      stock: number;
      colorName: string;
      colorCode: string;
      size?: string;
    }[],
  ) {
    return prisma.productVariant.createMany({
      data: variants.map((item) => ({
        productId,
        title: item.title,
        price: item.price,
        stock: item.stock,
        colorName: item.colorName,
        colorCode: item.colorCode,
        size: item.size,
      })),
    });
  }
}

export const productVariantRepository = new ProductVariantRepository();