import { ProductStatus } from "@prisma/client";
import { productRepository } from "@/lib/repositories/product.repository";
import fs from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { productVariantService } from "./product-variant.service";
class ProductService {
  private productRepository = productRepository;

  // -------------------------
  // Product Detail
  // -------------------------

  async getRelatedProducts(categoryId: number, productId: number, limit = 4) {
    return this.productRepository.findRelated(categoryId, productId, limit);
  }

  async getSuggestedProducts(productId: number, limit = 8) {
    return this.productRepository.findRandomPublished(productId, limit);
  }

  // -------------------------
  // Products
  // -------------------------

  async getPublishedProducts(page = 1, limit = 12) {
    return productRepository.filter({
      page,
      limit,
      status: ProductStatus.ACTIVE,
    });
  }

  async getFilteredProducts(filters: {
    search?: string;
    category?: string;
    brand?: string;
    status?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }) {
    return this.productRepository.filter(filters);
  }

  async findBestSellers(limit = 12) {
    return productRepository.findBestSellers(limit);
  }

  async findLatestProducts(limit = 10) {
    return this.productRepository.findLatestProducts(limit);
  }

  async getAll() {
    return productRepository.findAll();
  }

  async getById(id: number) {
    const product = await productRepository.findById(id);

    if (!product) {
      throw new Error("محصول پیدا نشد.");
    }

    return product;
  }

  async getBySlug(slug: string) {
    const product = await productRepository.findBySlug(slug);

    if (!product) {
      throw new Error("محصول پیدا نشد.");
    }

    return product;
  }

  async search(keyword: string) {
    return productRepository.search(keyword);
  }

  async create(data: {
    title: string;
    slug?: string;
    description?: string;
    price: number;
    stock: number;
    thumbnail?: string;
    images?: string[];
    status?: ProductStatus;
    categoryId: number;
    brandId: number;
    discountPrice?: number;
    shortDescription?: string;
    purchasePrice: number;
    variants?: {
      title: string;
      price?: number;
      stock: number;
      colorName: string;
      colorCode: string;
      size?: string;
    }[];
  }) {
    if (!data.title.trim()) {
      throw new Error("عنوان محصول الزامی است.");
    }

    if (data.price < 0) {
      throw new Error("قیمت نامعتبر است.");
    }

    if (data.stock < 0) {
      throw new Error("موجودی نامعتبر است.");
    }
    if (data.purchasePrice < 0) {
      throw new Error("قیمت خرید نامعتبر است.");
    }
    const slug =
      data.slug && data.slug.length > 0
        ? data.slug
        : this.generateSlug(data.title);

    const exist = await productRepository.findBySlug(slug);

    if (exist) {
      throw new Error("Slug قبلاً استفاده شده است.");
    }

    const { variants, ...productData } = data;

    const product = await productRepository.create({
      ...productData,
      slug,
      status: data.status ?? ProductStatus.ACTIVE,
    });

    if (variants && variants.length) {
      await productVariantService.createMany(product.id, variants);
    }

    return product;
  }

  async update(
    id: number,
    data: {
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
      discountPrice?: number;
      shortDescription?: string;
      purchasePrice: number;
    },
  ) {
    await this.getById(id);

    if (data.slug) {
      const exist = await productRepository.findBySlug(data.slug);

      if (exist && exist.id !== id) {
        throw new Error("Slug تکراری است.");
      }
    }

    return productRepository.update(id, data);
  }

  async delete(id: number) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
      },
    });

    if (!product) {
      throw new Error("محصول پیدا نشد.");
    }

    if (product.thumbnail) {
      await this.deleteFileIfExists(product.thumbnail, "Thumbnail");
    }

    for (const image of product.images) {
      await this.deleteFileIfExists(image.image, "Gallery image");
    }

    await prisma.productImage.deleteMany({
      where: {
        productId: id,
      },
    });

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return true;
  }

  async count() {
    return productRepository.count();
  }

  async getStatistics() {
    const [totalProducts, activeProducts, outOfStockProducts] =
      await Promise.all([
        productRepository.count(),

        productRepository.count({
          status: ProductStatus.ACTIVE,
        }),

        productRepository.count({
          AND: [
            {
              status: ProductStatus.ACTIVE,
            },
            {
              stock: 0,
            },
          ],
        }),
      ]);

    return {
      totalProducts,
      activeProducts,
      outOfStockProducts,
    };
  }

  private generateSlug(title: string) {
    return title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }

  private resolveUploadPath(storedPath: string): string {
    let cleaned = storedPath.trim();

    if (cleaned.startsWith("/")) {
      cleaned = cleaned.slice(1);
    }

    if (!cleaned.startsWith("public/") && cleaned !== "public") {
      cleaned = path.join("public", cleaned);
    }

    return path.join(process.cwd(), cleaned);
  }

  private async deleteFileIfExists(storedPath: string, label: string) {
    if (!storedPath) return;

    const filePath = this.resolveUploadPath(storedPath);

    try {
      await fs.access(filePath);

      await fs.unlink(filePath);

      console.log(`${label} deleted:`, filePath);
    } catch (err: unknown) {
      const code =
        typeof err === "object" && err !== null && "code" in err
          ? (err as { code?: unknown }).code
          : undefined;
      if (code === "ENOENT") {
        console.warn(`${label} not found on disk, skipping:`, filePath);
      } else {
        console.error(`${label} delete error:`, err);
      }
    }
  }
}

export const productService = new ProductService();
