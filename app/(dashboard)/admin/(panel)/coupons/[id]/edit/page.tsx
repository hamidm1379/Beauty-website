import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

import CouponForm from "@/app/features/admin/components/coupons/CouponForm";
import { couponService } from "@/lib/services/coupon.service";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditCouponPage({ params }: Props) {
  const { id } = await params;

  let coupon;

  try {
    coupon = await couponService.getById(Number(id));
  } catch {
    notFound();
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 sm:text-3xl">
            ویرایش کد تخفیف
          </h1>
          <p className="mt-1 text-xs text-gray-500 sm:mt-2 sm:text-sm">
            اطلاعات کد تخفیف را بروزرسانی کنید.
          </p>
        </div>

        <Link
          href="/admin/coupons"
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium transition hover:bg-gray-50 sm:gap-2 sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm"
        >
          <ArrowRight size={16} className="sm:hidden" />
          <ArrowRight size={18} className="hidden sm:block" />
          بازگشت
        </Link>
      </div>

      <CouponForm
        mode="edit"
        initialData={{
          id: coupon.id,
          code: coupon.code,
          title: coupon.title,
          description: coupon.description,
          type: coupon.type,
          value: coupon.value,
          minimumPurchase: coupon.minimumPurchase,
          maximumDiscount: coupon.maximumDiscount,
          usageLimit: coupon.usageLimit,
          isActive: coupon.isActive,
          startsAt: coupon.startsAt ? coupon.startsAt.toISOString() : null,
          expiresAt: coupon.expiresAt ? coupon.expiresAt.toISOString() : null,
        }}
      />
    </div>
  );
}