import { categoryRepository } from "@/lib/repositories/category.repository";
import fs from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

class CategoryService {
  async findHomeCategories() {
    return categoryRepository.findHomeCategories();
  }
  async getAll() {
    return categoryRepository.findAll();
  }

  async getById(id: number) {
    const category = await categoryRepository.findById(id);

    if (!category) {
      throw new Error("دسته‌بندی پیدا نشد.");
    }

    return category;
  }

  async create(data: { title: string; slug?: string; image?: string }) {
    if (!data.title.trim()) {
      throw new Error("عنوان دسته‌بندی الزامی است.");
    }

    const slug =
      data.slug && data.slug.length > 0
        ? data.slug
        : this.generateSlug(data.title);

    const exist = await categoryRepository.findBySlug(slug);

    if (exist) {
      throw new Error("Slug قبلاً استفاده شده است.");
    }

    return categoryRepository.create({
      title: data.title,
      slug,
      image: data.image,
    });
  }

  async update(
    id: number,
    data: {
      title?: string;
      slug?: string;
      image?: string;
    },
  ) {
    await this.getById(id);

    if (data.slug) {
      const exist = await categoryRepository.findBySlug(data.slug);

      if (exist && exist.id !== id) {
        throw new Error("Slug تکراری است.");
      }
    }

    return categoryRepository.update(id, data);
  }

  async delete(id: number) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });

    if (!category) {
      throw new Error("دسته‌بندی پیدا نشد.");
    }

    if (category.products.length > 0) {
      throw new Error("این دسته‌بندی دارای محصول است و قابل حذف نیست.");
    }

    // حذف عکس
    if (category.image) {
      try {
        const filePath = path.join(
          process.cwd(),
          "public",
          category.image.replace(/^\/+/, ""),
        );

        await fs.unlink(filePath);
      } catch (err) {
        console.error("Delete image:", err);
      }
    }

    return categoryRepository.delete(id);
  }
  async count() {
    return categoryRepository.count();
  }

  private generateSlug(title: string) {
    return title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }
}

export const categoryService = new CategoryService();
