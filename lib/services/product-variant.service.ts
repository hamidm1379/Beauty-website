import { productVariantRepository } from "@/lib/repositories/product-variant.repository";

/** شکل ورودی یک واریانت محصول هنگام ساخت. */
export type ProductVariantInput = {
  title: string;
  price?: number;
  stock: number;
  colorName: string;
  colorCode: string;
  size?: string;
};

class ProductVariantService {
  createMany(productId: number, variants: ProductVariantInput[]) {
    return productVariantRepository.createMany(productId, variants);
  }
}

export const productVariantService = new ProductVariantService();
