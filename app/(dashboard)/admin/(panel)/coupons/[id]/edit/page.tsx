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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            ویرایش کد تخفیف
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            اطلاعات کد تخفیف را بروزرسانی کنید.
          </p>
        </div>

        <Link
          href="/admin/coupons"
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium transition hover:bg-gray-50"
        >
          <ArrowRight size={18} />
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