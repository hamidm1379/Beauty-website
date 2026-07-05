import { brandRepository } from "@/lib/repositories/brand.repository";

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

  async create(data: {
    title: string;
    slug?: string;
    logo?: string;
  }) {
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
    }
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
    await this.getById(id);

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