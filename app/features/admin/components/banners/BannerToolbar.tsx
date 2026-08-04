"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, RotateCcw } from "lucide-react";
import { useState } from "react";

interface BannerToolbarProps {
  totalBanners: number;

  filters: {
    search: string;
    position: string;
    status: string;
    sort: string;
  };
}

export default function BannerToolbar({
  totalBanners,
  filters,
}: BannerToolbarProps) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [search, setSearch] = useState(filters.search);

  function updateQuery(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`/admin/banners?${params.toString()}`);
  }

  function handleSearch() {
    updateQuery("search", search);
  }

  function resetFilters() {
    router.push("/admin/banners");
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
      <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-end lg:justify-between">
        {/* Search */}

        <div className="flex-1">
          <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
            جستجو
          </label>

          <div className="flex gap-1.5 sm:gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 sm:right-4 sm:size-[18px]" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="عنوان یا لینک بنر..."
                className="w-full rounded-lg border border-gray-200 py-2 pr-9 pl-3 text-sm outline-none transition focus:border-pink-500 sm:rounded-xl sm:py-3 sm:pr-11 sm:pl-4 sm:text-base"
              />
            </div>

            <button
              onClick={handleSearch}
              className="rounded-lg bg-pink-600 px-3 text-sm text-white transition hover:bg-pink-700 sm:rounded-xl sm:px-5 sm:text-base"
            >
              جستجو
            </button>
          </div>
        </div>

        {/* Filters */}

        <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
          {/* Position */}

          <div>
            <label className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">محل نمایش</label>

            <select
              value={filters.position}
              onChange={(e) => updateQuery("position", e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
            >
              <option value="">همه</option>
              <option value="HOME_HERO">اسلایدر اصلی</option>
              <option value="HOME_TOP">بالای صفحه</option>
              <option value="HOME_MIDDLE">وسط صفحه</option>
              <option value="HOME_BOTTOM">پایین صفحه</option>
              <option value="SIDEBAR">سایدبار</option>
              <option value="CATEGORY">صفحه دسته‌بندی</option>
            </select>
          </div>

          {/* Status */}

          <div>
            <label className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">وضعیت</label>

            <select
              value={filters.status}
              onChange={(e) => updateQuery("status", e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
            >
              <option value="">همه</option>
              <option value="ACTIVE">فعال</option>
              <option value="INACTIVE">غیرفعال</option>
            </select>
          </div>

          {/* Sort */}

          <div>
            <label className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">مرتب سازی</label>

            <select
              value={filters.sort}
              onChange={(e) => updateQuery("sort", e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
            >
              <option value="order">ترتیب نمایش</option>
              <option value="newest">جدیدترین</option>
              <option value="oldest">قدیمی‌ترین</option>
              <option value="title">عنوان</option>
            </select>
          </div>
        </div>
      </div>

      {/* Footer */}

      <div className="mt-4 flex items-center justify-between border-t pt-4 sm:mt-6 sm:pt-5">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 sm:gap-2 sm:text-sm">
          <Filter size={14} className="sm:hidden" />
          <Filter size={16} className="hidden sm:block" />
          <span>{totalBanners.toLocaleString("fa-IR")} بنر</span>
        </div>

        <button
          onClick={resetFilters}
          className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition hover:bg-gray-50 sm:gap-2 sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm"
        >
          <RotateCcw size={14} className="sm:hidden" />
          <RotateCcw size={16} className="hidden sm:block" />
          حذف فیلترها
        </button>
      </div>
    </div>
  );
}