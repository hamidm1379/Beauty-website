import { articleRepository } from "@/lib/repositories/article.repository";
import { prisma } from "../prisma";
import fs from "fs/promises";
import path from "path";

class ArticleService {
   async getRelatedBrands(
    articleId: number,
    limit = 4,
  ) {
    return articleRepository.findRelatedBrands(
      articleId,
      limit,
    );
  }
  async getPublishedBrands({
    page = 1,
    limit = 12,
    search,
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    return articleRepository.findPublishedBrands({
      page,
      limit,
      search,
    });
  }
  async getCategories() {
    return articleRepository.findCategories();
  }
  async getPublishedArticles(page = 1, limit = 9) {
    return articleRepository.findPublished({
      page,
      limit,
    });
  }

  async getRelatedArticles(categoryId: number, articleId: number) {
    return articleRepository.findRelated(categoryId, articleId);
  }

  async getSuggestedArticles(articleId: number, limit = 8) {
    return articleRepository.findRandomPublished(articleId, limit);
  }

  async increaseViews(id: number) {
    return articleRepository.increaseViews(id);
  }

  async findRelated(categoryId: number, articleId: number) {
    return articleRepository.findRelated(categoryId, articleId);
  }
  async findHomeArticles(limit = 9) {
    return articleRepository.findHomeArticles(limit);
  }
  async getBySlug(slug: string) {
    const article = await articleRepository.findBySlug(slug);

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
    const existing = await this.getById(id);

    // Delete old thumbnail if a new one is provided and differs from the current
    if (data.thumbnail && existing.thumbnail && data.thumbnail !== existing.thumbnail) {
      try {
        const filePath = path.join(
          process.cwd(),
          "public",
          existing.thumbnail.replace(/^\/+/, ""),
        );
        await fs.unlink(filePath);
      } catch {
        // File may not exist, ignore
      }
    }

    // Delete old content images if content is being replaced
    if (data.content && data.content !== existing.content) {
      await this.deleteContentImages(existing.content);
    }

    return prisma.article.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    const existing = await this.getById(id);

    // Delete thumbnail file
    if (existing.thumbnail) {
      try {
        const filePath = path.join(
          process.cwd(),
          "public",
          existing.thumbnail.replace(/^\/+/, ""),
        );
        await fs.unlink(filePath);
      } catch {
        // File may not exist, ignore
      }
    }

    // Delete content images
    if (existing.content) {
      await this.deleteContentImages(existing.content);
    }

    return articleRepository.delete(id);
  }

  async count() {
    return articleRepository.count();
  }

  private extractImagesFromContent(content: string): string[] {
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    const images: string[] = [];
    let match;
    while ((match = imgRegex.exec(content)) !== null) {
      const src = match[1];
      if (src && src.startsWith("/")) {
        images.push(src);
      }
    }
    return images;
  }

  private async deleteContentImages(content: string) {
    const images = this.extractImagesFromContent(content);
    for (const imgPath of images) {
      try {
        const filePath = path.join(
          process.cwd(),
          "public",
          imgPath.replace(/^\/+/, ""),
        );
        await fs.unlink(filePath);
      } catch {
        // File may not exist, ignore
      }
    }
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
