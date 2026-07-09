import { ProductStatus } from "@prisma/client";
import { productRepository } from "@/lib/repositories/product.repository";
import fs from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

class ProductService {
  async getFilteredProducts(filters: {
    search?: string;
    category?: string;
    brand?: string;
    status?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }) {
    return productRepository.filter(filters);
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

    const slug =
      data.slug && data.slug.length > 0
        ? data.slug
        : this.generateSlug(data.title);

    const exist = await productRepository.findBySlug(slug);

    if (exist) {
      throw new Error("Slug قبلاً استفاده شده است.");
    }

    return productRepository.create({
      ...data,
      slug,
      status: data.status ?? ProductStatus.ACTIVE,
    });
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
      where: { id },
      include: {
        images: true,
      },
    });

    if (!product) {
      throw new Error("محصول پیدا نشد.");
    }

    // حذف Thumbnail
    if (product.thumbnail) {
      await this.deleteFileIfExists(product.thumbnail, "Thumbnail");
    }

    // حذف تصاویر گالری
    for (const image of product.images) {
      await this.deleteFileIfExists(image.image, "Gallery image");
    }

    // حذف رکوردهای تصاویر
    await prisma.productImage.deleteMany({
      where: {
        productId: id,
      },
    });

    // حذف محصول
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
          OR: [
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

  /**
   * مسیر ذخیره‌شده در دیتابیس (که معمولاً برای نمایش در مرورگر است،
   * مثل "/uploads/products/abc.jpg") را به مسیر فیزیکی درست روی دیسک
   * (داخل پوشه public) تبدیل می‌کند.
   *
   * پشتیبانی از حالت‌های مختلف:
   * - "/uploads/products/abc.jpg"
   * - "uploads/products/abc.jpg"
   * - "/public/uploads/products/abc.jpg"
   * - "public/uploads/products/abc.jpg"
   */
  private resolveUploadPath(storedPath: string): string {
    let cleaned = storedPath.trim();

    // حذف اسلش ابتدایی
    if (cleaned.startsWith("/")) {
      cleaned = cleaned.slice(1);
    }

    // اگر از قبل با public شروع نشده، اضافه‌اش کن
    if (!cleaned.startsWith("public/") && cleaned !== "public") {
      cleaned = path.join("public", cleaned);
    }

    return path.join(process.cwd(), cleaned);
  }

  /**
   * فایل را در صورت وجود از روی دیسک پاک می‌کند.
   * اگر فایل پیدا نشد یا خطای دیگری رخ داد، فقط لاگ می‌کند
   * تا حذف محصول متوقف نشود.
   */
  private async deleteFileIfExists(storedPath: string, label: string) {
    if (!storedPath) return;

    const filePath = this.resolveUploadPath(storedPath);

    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
      console.log(`${label} deleted:`, filePath);
    } catch (err: any) {
      if (err?.code === "ENOENT") {
        console.warn(`${label} not found on disk, skipping:`, filePath);
      } else {
        console.error(`${label} delete error:`, err);
      }
    }
  }
}

export const productService = new ProductService();