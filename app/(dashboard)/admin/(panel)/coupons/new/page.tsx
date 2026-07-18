import Link from "next/link";
import { ArrowRight } from "lucide-react";

import CouponForm from "@/app/features/admin/components/coupons/CouponForm";

export default function NewCouponPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            افزودن کد تخفیف جدید
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            اطلاعات کد تخفیف را وارد کنید.
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

      <CouponForm mode="create" />
    </div>
  );
}