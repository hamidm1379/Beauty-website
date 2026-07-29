import { brandRepository } from "@/lib/repositories/brand.repository";
import fs from "fs/promises";
import path from "path";

class BrandService {
  async getAll() {
    return brandRepository.findAll();
  }

  async getById(id: number) {
    const brand = await brandRepository.findById(id);

    if (!brand) {
      throw new Error("برند پیدا نشد.");
    }

    return brand;
  }

  async create(data: { title: string; slug?: string; logo?: string }) {
    if (!data.title.trim()) {
      throw new Error("عنوان برند الزامی است.");
    }

    const slug =
      data.slug && data.slug.length > 0
        ? data.slug
        : this.generateSlug(data.title);

    const exist = await brandRepository.findBySlug(slug);

    if (exist) {
      throw new Error("Slug قبلاً استفاده شده است.");
    }

    return brandRepository.create({
      title: data.title,
      slug,
      logo: data.logo,
    });
  }

  async update(
    id: number,
    data: {
      title?: string;
      slug?: string;
      logo?: string;
    },
  ) {
    await this.getById(id);

    if (data.slug) {
      const exist = await brandRepository.findBySlug(data.slug);

      if (exist && exist.id !== id) {
        throw new Error("Slug قبلاً استفاده شده است.");
      }
    }

    return brandRepository.update(id, data);
  }

  async delete(id: number) {
    const brand = await this.getById(id);

    // اگر محصول دارد حذف نشود
    const productCount = "_count" in brand ? brand._count.products : 0;
    if (productCount > 0) {
      throw new Error("ابتدا محصولات این برند را حذف یا منتقل کنید.");
    }

    // حذف فایل لوگو
    if (brand.logo) {
      try {
        const filePath = path.join(
          process.cwd(),
          "public",
          brand.logo.replace(/^\/+/, ""),
        );

        await fs.unlink(filePath);
      } catch {
        // اگر فایل وجود نداشت مشکلی نیست
      }
    }

    return brandRepository.delete(id);
  }
  async count() {
    return brandRepository.count();
  }

  private generateSlug(title: string) {
    return title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }
}

export const brandService = new BrandService();
