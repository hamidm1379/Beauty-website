import { articleCategoryRepository } from "@/lib/repositories/article-category.repository";

class ArticleCategoryService {
  async getCategories() {
    return articleCategoryRepository.findCategories();
  }
  async getAll() {
    return articleCategoryRepository.findAll();
  }

  async getById(id: number) {
    const category = await articleCategoryRepository.findById(id);

    if (!category) {
      throw new Error("دسته‌بندی مقاله پیدا نشد.");
    }

    return category;
  }

  async create(data: {
    title: string;
    slug?: string;
    image?: string;
    seoTitle?: string;
    seoDescription?: string;
  }) {
    if (!data.title.trim()) {
      throw new Error("عنوان دسته‌بندی الزامی است.");
    }

    const slug =
      data.slug && data.slug.length > 0
        ? data.slug
        : this.generateSlug(data.title);

    const exist = await articleCategoryRepository.findBySlug(slug);

    if (exist) {
      throw new Error("Slug قبلاً استفاده شده است.");
    }

    return articleCategoryRepository.create({
      title: data.title,
      slug,
      image: data.image,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
    });
  }

  async update(
    id: number,
    data: {
      title?: string;
      slug?: string;
      image?: string;
      seoTitle?: string;
      seoDescription?: string;
    },
  ) {
    await this.getById(id);

    if (data.slug) {
      const exist = await articleCategoryRepository.findBySlug(data.slug);

      if (exist && exist.id !== id) {
        throw new Error("Slug قبلاً استفاده شده است.");
      }
    }

    return articleCategoryRepository.update(id, data);
  }

  async delete(id: number) {
    await this.getById(id);

    return articleCategoryRepository.delete(id);
  }

  async count() {
    return articleCategoryRepository.count();
  }

  private generateSlug(title: string) {
    return title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }
}

export const articleCategoryService = new ArticleCategoryService();
