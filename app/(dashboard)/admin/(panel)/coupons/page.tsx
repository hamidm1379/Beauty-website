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
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 sm:text-3xl">
            کدهای تخفیف
          </h1>
          <p className="mt-1 text-xs text-gray-500 sm:mt-2 sm:text-sm">
            {total.toLocaleString("fa-IR")} کد تخفیف ثبت شده
          </p>
        </div>

        <Link
          href="/admin/coupons/new"
          className="flex items-center gap-1.5 rounded-lg bg-pink-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-pink-700 sm:gap-2 sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm"
        >
          <Plus size={16} className="sm:hidden" />
          <Plus size={18} className="hidden sm:block" />
          افزودن کد تخفیف
        </Link>
      </div>

      {/* Empty state */}
      {coupons.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm sm:rounded-3xl sm:p-16">
          <Tag className="mx-auto text-gray-300" size={36} />
          <h2 className="mt-3 text-base font-bold text-gray-700 sm:mt-4 sm:text-lg">
            هنوز کد تخفیفی ثبت نشده است
          </h2>
          <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
            برای شروع، اولین کد تخفیف خود را ایجاد کنید.
          </p>
          <Link
            href="/admin/coupons/new"
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-pink-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-pink-700 sm:mt-6 sm:gap-2 sm:rounded-xl sm:px-6 sm:py-3 sm:text-sm"
          >
            <Plus size={16} className="sm:hidden" />
            <Plus size={18} className="hidden sm:block" />
            افزودن کد تخفیف
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm sm:rounded-3xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-right text-sm sm:text-base">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  <th className="px-3 py-2.5 text-xs font-semibold whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 sm:text-sm">
                    کد
                  </th>
                  <th className="px-3 py-2.5 text-xs font-semibold whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 sm:text-sm">
                    عنوان
                  </th>
                  <th className="px-3 py-2.5 text-xs font-semibold whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 sm:text-sm">
                    نوع
                  </th>
                  <th className="px-3 py-2.5 text-xs font-semibold whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 sm:text-sm">
                    مقدار
                  </th>
                  <th className="px-3 py-2.5 text-xs font-semibold whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 sm:text-sm">
                    استفاده شده
                  </th>
                  <th className="px-3 py-2.5 text-xs font-semibold whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 sm:text-sm">
                    انقضا
                  </th>
                  <th className="px-3 py-2.5 text-xs font-semibold whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 sm:text-sm">
                    وضعیت
                  </th>
                  <th className="px-3 py-2.5 text-xs font-semibold whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 sm:text-sm">
                    عملیات
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {coupons.map((coupon) => {
                  const status = getStatus(coupon);

                  return (
                    <tr key={coupon.id} className="transition hover:bg-gray-50">
                      <td className="px-3 py-3 whitespace-nowrap sm:px-6 sm:py-4">
                        <span className="rounded-lg bg-pink-50 px-2 py-1 font-mono text-xs font-bold text-pink-600 sm:px-3 sm:py-1.5 sm:text-sm">
                          {coupon.code}
                        </span>
                      </td>

                      <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-700 sm:px-6 sm:py-4 sm:text-sm">
                        {coupon.title ?? "—"}
                      </td>

                      <td className="px-3 py-3 whitespace-nowrap sm:px-6 sm:py-4">
                        <span className="flex w-fit items-center gap-1.5 rounded-lg bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                          {coupon.type === "PERCENT" ? (
                            <Percent size={12} />
                          ) : (
                            <Tag size={12} />
                          )}
                          {coupon.type === "PERCENT" ? "درصدی" : "مبلغ ثابت"}
                        </span>
                      </td>

                      <td className="px-3 py-3 whitespace-nowrap text-xs font-bold text-gray-900 sm:px-6 sm:py-4 sm:text-sm">
                        {coupon.type === "PERCENT"
                          ? `${coupon.value.toLocaleString("fa-IR")}٪`
                          : `${coupon.value.toLocaleString("fa-IR")} تومان`}
                      </td>

                      <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-600 sm:px-6 sm:py-4 sm:text-sm">
                        {coupon.usedCount.toLocaleString("fa-IR")}
                        {coupon.usageLimit
                          ? ` / ${coupon.usageLimit.toLocaleString("fa-IR")}`
                          : ""}
                      </td>

                      <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-600 sm:px-6 sm:py-4 sm:text-sm">
                        {formatDate(coupon.expiresAt)}
                      </td>

                      <td className="px-3 py-3 whitespace-nowrap sm:px-6 sm:py-4">
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold sm:px-3 sm:text-xs ${status.className}`}>
                          {status.label}
                        </span>
                      </td>

                      <td className="px-3 py-3 sm:px-6 sm:py-4">
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
            <div className="flex items-center justify-center gap-1.5 overflow-x-auto border-t border-gray-100 px-3 py-3 sm:gap-2 sm:px-6 sm:py-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <Link
                    key={pageNum}
                    href={`/admin/coupons?page=${pageNum}`}
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-medium transition sm:h-9 sm:w-9 sm:text-sm ${pageNum === currentPage ? "bg-pink-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
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