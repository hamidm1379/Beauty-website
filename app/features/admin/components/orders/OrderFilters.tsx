"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "", label: "همه وضعیت‌ها" },
  { value: "PENDING", label: "در انتظار" },
  { value: "CONFIRMED", label: "تایید شده" },
  { value: "PROCESSING", label: "در حال پردازش" },
  { value: "SHIPPED", label: "ارسال شده" },
  { value: "DELIVERED", label: "تحویل شده" },
  { value: "CANCELLED", label: "لغو شده" },
  { value: "RETURNED", label: "مرجوع شده" },
];

const PAYMENT_STATUS_OPTIONS = [
  { value: "", label: "همه وضعیت‌های پرداخت" },
  { value: "PENDING", label: "در انتظار پرداخت" },
  { value: "PAID", label: "پرداخت‌شده" },
  { value: "FAILED", label: "ناموفق" },
  { value: "REFUNDED", label: "بازگشت وجه" },
];

export default function OrderFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const status = searchParams.get("status") ?? "";
  const paymentStatus = searchParams.get("paymentStatus") ?? "";

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // با تغییر فیلتر، برگرد به صفحه‌ی اول
    params.delete("page");

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  // جستجو با تاخیر (debounce) تا با هر حرف، درخواست جدید نره
  useEffect(() => {
    const currentSearch = searchParams.get("search") ?? "";

    if (search === currentSearch) return;

    const timeout = setTimeout(() => {
      updateParams({ search });
    }, 500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const hasActiveFilters = !!(search || status || paymentStatus);

  function resetFilters() {
    setSearch("");
    router.push(pathname);
  }

  return (
    <div className="space-y-3 sm:space-y-4 rounded-2xl sm:rounded-3xl bg-white p-3 sm:p-5 shadow-sm">
      <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-gray-500">
        <SlidersHorizontal className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        فیلتر سفارش‌ها
      </div>

      <div className="flex flex-col gap-2.5 sm:gap-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 sm:h-[18px] sm:w-[18px] -translate-y-1/2 text-gray-400 sm:right-4" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو بر اساس شماره سفارش، نام یا شماره موبایل مشتری..."
            className="h-10 sm:h-12 w-full rounded-xl sm:rounded-2xl border border-gray-200 bg-gray-50 pr-9 pl-8 sm:pr-11 sm:pl-10 text-xs sm:text-sm outline-none transition focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              aria-label="پاک کردن جستجو"
            >
              <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          )}
        </div>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => updateParams({ status: e.target.value })}
          className="h-10 sm:h-12 rounded-xl sm:rounded-2xl border border-gray-200 bg-gray-50 px-3 sm:px-4 text-xs sm:text-sm outline-none transition focus:border-pink-400 focus:bg-white lg:w-56"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Payment Status */}
        <select
          value={paymentStatus}
          onChange={(e) => updateParams({ paymentStatus: e.target.value })}
          className="h-10 sm:h-12 rounded-xl sm:rounded-2xl border border-gray-200 bg-gray-50 px-3 sm:px-4 text-xs sm:text-sm outline-none transition focus:border-pink-400 focus:bg-white lg:w-56"
        >
          {PAYMENT_STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Reset */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="flex h-10 sm:h-12 items-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-xl sm:rounded-2xl border border-gray-200 px-4 sm:px-5 text-xs sm:text-sm font-medium text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
          >
            <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            حذف فیلترها
          </button>
        )}
      </div>
    </div>
  );
}