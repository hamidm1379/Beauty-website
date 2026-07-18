import { CouponType } from "@prisma/client";
import { couponRepository } from "@/lib/repositories/coupon.repository";

class CouponService {
  async create(data: {
    code: string;
    title?: string;
    description?: string;
    type: CouponType;
    value: number;
    minimumPurchase?: number | null;
    maximumDiscount?: number | null;
    usageLimit?: number | null;
    isActive?: boolean;
    startsAt?: string | null;
    expiresAt?: string | null;
  }) {
    const code = data.code.trim().toUpperCase();

    if (!code) {
      throw new Error("کد تخفیف الزامی است.");
    }

    if (data.value <= 0) {
      throw new Error("مقدار تخفیف باید بیشتر از صفر باشد.");
    }

    if (data.type === "PERCENT" && data.value > 100) {
      throw new Error("درصد تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد.");
    }

    const exist = await couponRepository.findByCode(code);

    if (exist) {
      throw new Error("این کد تخفیف قبلاً ثبت شده است.");
    }

    return couponRepository.create({
      code,
      title: data.title,
      description: data.description,
      type: data.type,
      value: data.value,
      minimumPurchase: data.minimumPurchase ?? null,
      maximumDiscount: data.maximumDiscount ?? null,
      usageLimit: data.usageLimit ?? null,
      isActive: data.isActive ?? true,
      startsAt: data.startsAt ? new Date(data.startsAt) : null,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
    });
  }

  async update(
    id: number,
    data: {
      code?: string;
      title?: string;
      description?: string;
      type?: CouponType;
      value?: number;
      minimumPurchase?: number | null;
      maximumDiscount?: number | null;
      usageLimit?: number | null;
      isActive?: boolean;
      startsAt?: string | null;
      expiresAt?: string | null;
    },
  ) {
    await this.getById(id);

    if (data.value !== undefined && data.value <= 0) {
      throw new Error("مقدار تخفیف باید بیشتر از صفر باشد.");
    }

    if (data.type === "PERCENT" && data.value && data.value > 100) {
      throw new Error("درصد تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد.");
    }

    let code: string | undefined;

    if (data.code) {
      code = data.code.trim().toUpperCase();

      const exist = await couponRepository.findByCode(code);

      if (exist && exist.id !== id) {
        throw new Error("این کد تخفیف قبلاً ثبت شده است.");
      }
    }

    return couponRepository.update(id, {
      ...(code ? { code } : {}),
      title: data.title,
      description: data.description,
      type: data.type,
      value: data.value,
      minimumPurchase: data.minimumPurchase,
      maximumDiscount: data.maximumDiscount,
      usageLimit: data.usageLimit,
      isActive: data.isActive,
      startsAt:
        data.startsAt !== undefined
          ? data.startsAt
            ? new Date(data.startsAt)
            : null
          : undefined,
      expiresAt:
        data.expiresAt !== undefined
          ? data.expiresAt
            ? new Date(data.expiresAt)
            : null
          : undefined,
    });
  }

  async getAll(params?: { page?: number; limit?: number }) {
    return couponRepository.findAll(params);
  }

  async getById(id: number) {
    const coupon = await couponRepository.findById(id);

    if (!coupon) {
      throw new Error("کد تخفیف پیدا نشد.");
    }

    return coupon;
  }

  async delete(id: number) {
    await this.getById(id);

    return couponRepository.delete(id);
  }
}

export const couponService = new CouponService();