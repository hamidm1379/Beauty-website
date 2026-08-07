import { Prisma } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

import { bannerRepository } from "@/lib/repositories/banner.repository";

class BannerService {
  async getAll() {
    return bannerRepository.findAll();
  }

  async getById(id: number) {
    const banner = await bannerRepository.findById(id);

    if (!banner) {
      throw new Error("بنر پیدا نشد.");
    }

    return banner;
  }

  async getFilteredBanners(filters: {
    search?: string;
    position?: string;
    status?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }) {
    return bannerRepository.findFiltered(filters);
  }

  async getStatistics() {
    return bannerRepository.getStatistics();
  }

  async create(data: Prisma.BannerCreateInput) {
    if (!data.title.trim()) {
      throw new Error("عنوان بنر الزامی است.");
    }

    if (!data.image) {
      throw new Error("تصویر بنر الزامی است.");
    }

    return bannerRepository.create(data);
  }

  async update(id: number, data: Prisma.BannerUpdateInput) {
    const existing = await this.getById(id);

    // Delete old image if a new one is provided and differs from the current
    if (data.image && existing.image && data.image !== existing.image) {
      try {
        const filePath = path.join(
          process.cwd(),
          "public",
          existing.image.replace(/^\/+/, ""),
        );
        await fs.unlink(filePath);
      } catch {
        // File may not exist, ignore
      }
    }

    // Delete old mobileImage if a new one is provided and differs from the current
    if (data.mobileImage && existing.mobileImage && data.mobileImage !== existing.mobileImage) {
      try {
        const filePath = path.join(
          process.cwd(),
          "public",
          existing.mobileImage.replace(/^\/+/, ""),
        );
        await fs.unlink(filePath);
      } catch {
        // File may not exist, ignore
      }
    }

    return bannerRepository.update(id, data);
  }

  async delete(id: number) {
    const existing = await this.getById(id);

    // Delete image file
    if (existing.image) {
      try {
        const filePath = path.join(
          process.cwd(),
          "public",
          existing.image.replace(/^\/+/, ""),
        );
        await fs.unlink(filePath);
      } catch {
        // File may not exist, ignore
      }
    }

    // Delete mobileImage file
    if (existing.mobileImage) {
      try {
        const filePath = path.join(
          process.cwd(),
          "public",
          existing.mobileImage.replace(/^\/+/, ""),
        );
        await fs.unlink(filePath);
      } catch {
        // File may not exist, ignore
      }
    }

    return bannerRepository.delete(id);
  }

  async count() {
    return bannerRepository.count();
  }
  async getHeroBanner() {
    return bannerRepository.getHeroBanner();
  }
  async findHeroBanners() {
  return bannerRepository.findHeroBanners();
}
}

export const bannerService = new BannerService();
