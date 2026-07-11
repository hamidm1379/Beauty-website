import { articleRepository } from "@/lib/repositories/article.repository";
import { prisma } from "../prisma";

class ArticleService {
  async getBySlug(slug: string) {
  const article = await articleRepository.findBySlug(slug);

  if (!article) {
    throw new Error("مقاله پیدا نشد.");
  }

  return article;
}
  async getAll() {
    return articleRepository.findAll();
  }

  async getById(id: number) {
    const article = await articleRepository.findById(id);

    if (!article) {
      throw new Error("مقاله پیدا نشد.");
    }

    return article;
  }

  async getFilteredArticles(filters: {
    search?: string;
    category?: string;
    status?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }) {
    return articleRepository.findFiltered(filters);
  }

  async getStatistics() {
    return articleRepository.getStatistics();
  }

  async create(data: {
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    thumbnail?: string;
    categoryId: number;
    status: "DRAFT" | "PUBLISHED";
    publishedAt?: Date | null;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
  }) {
    return prisma.article.create({
      data,
    });
  }

  async update(
    id: number,
    data: Partial<{
      title: string;
      slug: string;
      excerpt: string;
      content: string;
      thumbnail: string;
      categoryId: number;
      status: "DRAFT" | "PUBLISHED";
      publishedAt: Date | null;
      seoTitle: string;
      seoDescription: string;
      seoKeywords: string;
    }>,
  ) {
    return prisma.article.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    await this.getById(id);

    return articleRepository.delete(id);
  }

  async count() {
    return articleRepository.count();
  }

  private generateSlug(title: string) {
    return title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }
}

export const articleService = new ArticleService();
