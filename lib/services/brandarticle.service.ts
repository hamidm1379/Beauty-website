import { brandRepository } from "@/lib/repositories/brandarticle.repository";

class BrandService {
  private brandRepository = brandRepository;

  async getAll() {
    return this.brandRepository.findAll();
  }

  async getById(id: number) {
    const brand = await this.brandRepository.findById(id);

    if (!brand) {
      throw new Error("برند پیدا نشد.");
    }

    return brand;
  }

  async getBySlug(slug: string) {
    const brand = await this.brandRepository.findBySlug(slug);

    if (!brand) {
      throw new Error("برند پیدا نشد.");
    }

    return brand;
  }

  async search(keyword: string) {
    return this.brandRepository.search(keyword);
  }

  async getFilteredBrands(filters: {
    search?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }) {
    return this.brandRepository.filter(filters);
  }

  async create(data: {
    title: string;
    slug?: string;
    description?: string;
    logo?: string;
  }) {
    if (!data.title.trim()) {
      throw new Error("عنوان برند الزامی است.");
    }

    const slug =
      data.slug && data.slug.length > 0
        ? data.slug
        : this.generateSlug(data.title);

    const exist = await this.brandRepository.findBySlug(slug);

    if (exist) {
      throw new Error("Slug قبلاً استفاده شده است.");
    }

    return this.brandRepository.create({
      ...data,
      slug,
    });
  }

  async update(
    id: number,
    data: {
      title?: string;
      slug?: string;
      description?: string;
      logo?: string;
    },
  ) {
    await this.getById(id);

    if (data.slug) {
      const exist = await this.brandRepository.findBySlug(data.slug);

      if (exist && exist.id !== id) {
        throw new Error("Slug تکراری است.");
      }
    }

    return this.brandRepository.update(id, data);
  }

  async delete(id: number) {
    await this.getById(id);

    return this.brandRepository.delete(id);
  }

  async count() {
    return this.brandRepository.count();
  }

  async getStatistics() {
    const totalBrands = await this.brandRepository.count();

    return {
      totalBrands,
    };
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