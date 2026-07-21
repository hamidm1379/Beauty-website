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

  /**
   * بررسی معتبر بودن کد تخفیف نسبت به مبلغ سبد خرید و محاسبه‌ی مبلغ تخفیف نهایی.
   * amount: مبلغی که تخفیف باید روی آن اعمال شود (معمولاً subtotal بعد از تخفیف محصولات)
   */
  async validate(code: string, amount: number) {
    const normalizedCode = code.trim().toUpperCase();

    if (!normalizedCode) {
      throw new Error("کد تخفیف را وارد کنید.");
    }

    const coupon = await couponRepository.findByCode(normalizedCode);

    if (!coupon) {
      throw new Error("کد تخفیف معتبر نیست.");
    }

    if (!coupon.isActive) {
      throw new Error("این کد تخفیف غیرفعال است.");
    }

    const now = new Date();

    if (coupon.startsAt && coupon.startsAt > now) {
      throw new Error("این کد تخفیف هنوز فعال نشده است.");
    }

    if (coupon.expiresAt && coupon.expiresAt < now) {
      throw new Error("این کد تخفیف منقضی شده است.");
    }

    if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
      throw new Error("ظرفیت استفاده از این کد تخفیف تکمیل شده است.");
    }

    if (coupon.minimumPurchase && amount < coupon.minimumPurchase) {
      throw new Error(
        `حداقل مبلغ خرید برای استفاده از این کد تخفیف ${coupon.minimumPurchase.toLocaleString(
          "fa-IR",
        )} تومان است.`,
      );
    }

    let discountAmount =
      coupon.type === "PERCENT"
        ? Math.round((amount * coupon.value) / 100)
        : coupon.value;

    if (coupon.maximumDiscount && discountAmount > coupon.maximumDiscount) {
      discountAmount = coupon.maximumDiscount;
    }

    // تخفیف هیچ‌وقت نباید از مبلغ قابل اعمال بیشتر بشه
    discountAmount = Math.min(discountAmount, amount);

    return {
      id: coupon.id,
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      discountAmount,
    };
  }
}

export const couponService = new CouponService();