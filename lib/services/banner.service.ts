import { Prisma } from "@prisma/client";

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
    await this.getById(id);

    return bannerRepository.update(id, data);
  }

  async delete(id: number) {
    await this.getById(id);

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
