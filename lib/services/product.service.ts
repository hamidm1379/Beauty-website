import { ProductStatus } from "@prisma/client";
import { productRepository } from "@/lib/repositories/product.repository";

class ProductService {
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
    image?: string;
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
      image?: string;
      status?: ProductStatus;
      categoryId?: number;
      brandId?: number;
    }
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
    await this.getById(id);

    return productRepository.delete(id);
  }

  async count() {
    return productRepository.count();
  }

  private generateSlug(title: string) {
    return title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }
}

export const productService = new ProductService();