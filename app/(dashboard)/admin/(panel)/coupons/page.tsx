import Link from "next/link";
import { Plus, Percent, Tag } from "lucide-react";

import { couponService } from "@/lib/services/coupon.service";
import CouponRowActions from "@/app/features/admin/components/coupons/CouponRowActions";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function CouponsPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const result = await couponService.getAll({ page: currentPage, limit: 20 });

  const { items: coupons, total, totalPages } = result;

  function formatDate(date: Date | null) {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("fa-IR");
  }

  function getStatus(coupon: (typeof coupons)[number]) {
    const now = new Date();

    if (!coupon.isActive) {
      return { label: "غیرفعال", className: "bg-gray-100 text-gray-500" };
    }

    if (coupon.expiresAt && new Date(coupon.expiresAt) < now) {
      return { label: "منقضی شده", className: "bg-red-50 text-red-500" };
    }

    if (coupon.startsAt && new Date(coupon.startsAt) > now) {
      return { label: "شروع نشده", className: "bg-amber-50 text-amber-600" };
    }

    if (
      coupon.usageLimit !== null &&
      coupon.usedCount >= coupon.usageLimit
    ) {
      return {
        label: "ظرفیت تکمیل",
        className: "bg-orange-50 text-orange-600",
      };
    }

    return { label: "فعال", className: "bg-green-50 text-green-600" };
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            کدهای تخفیف
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {total.toLocaleString("fa-IR")} کد تخفیف ثبت شده
          </p>
        </div>

        <Link
          href="/admin/coupons/new"
          className="flex items-center gap-2 rounded-xl bg-pink-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-700"
        >
          <Plus size={18} />
          افزودن کد تخفیف
        </Link>
      </div>

      {/* Empty state */}
      {coupons.length === 0 ? (
        <div className="rounded-3xl border border-gray-100 bg-white p-16 text-center shadow-sm">
          <Tag className="mx-auto text-gray-300" size={48} />
          <h2 className="mt-4 text-lg font-bold text-gray-700">
            هنوز کد تخفیفی ثبت نشده است
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            برای شروع، اولین کد تخفیف خود را ایجاد کنید.
          </p>
          <Link
            href="/admin/coupons/new"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-pink-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-700"
          >
            <Plus size={18} />
            افزودن کد تخفیف
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    کد
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    عنوان
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    نوع
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    مقدار
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    استفاده شده
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    انقضا
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    وضعیت
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    عملیات
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {coupons.map((coupon) => {
                  const status = getStatus(coupon);

                  return (
                    <tr
                      key={coupon.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <span className="rounded-lg bg-pink-50 px-3 py-1.5 font-mono text-sm font-bold text-pink-600">
                          {coupon.code}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">
                        {coupon.title ?? "—"}
                      </td>

                      <td className="px-6 py-4">
                        <span className="flex w-fit items-center gap-1.5 rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                          {coupon.type === "PERCENT" ? (
                            <Percent size={12} />
                          ) : (
                            <Tag size={12} />
                          )}
                          {coupon.type === "PERCENT" ? "درصدی" : "مبلغ ثابت"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm font-bold text-gray-900">
                        {coupon.type === "PERCENT"
                          ? `${coupon.value.toLocaleString("fa-IR")}٪`
                          : `${coupon.value.toLocaleString("fa-IR")} تومان`}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {coupon.usedCount.toLocaleString("fa-IR")}
                        {coupon.usageLimit
                          ? ` / ${coupon.usageLimit.toLocaleString("fa-IR")}`
                          : ""}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(coupon.expiresAt)}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <CouponRowActions
                          couponId={coupon.id}
                          couponCode={coupon.code}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 border-t border-gray-100 px-6 py-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <Link
                    key={pageNum}
                    href={`/admin/coupons?page=${pageNum}`}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition ${
                      pageNum === currentPage
                        ? "bg-pink-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {pageNum.toLocaleString("fa-IR")}
                  </Link>
                ),
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}