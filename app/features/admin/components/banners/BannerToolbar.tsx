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
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        {/* Search */}

        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            جستجو
          </label>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  handleSearch()
                }
                placeholder="عنوان یا لینک بنر..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  py-3
                  pr-11
                  pl-4
                  outline-none
                  transition
                  focus:border-pink-500
                "
              />
            </div>

            <button
              onClick={handleSearch}
              className="
                rounded-xl
                bg-pink-600
                px-5
                text-white
                transition
                hover:bg-pink-700
              "
            >
              جستجو
            </button>
          </div>
        </div>

        {/* Filters */}

        <div className="grid gap-4 md:grid-cols-3">
          {/* Position */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              محل نمایش
            </label>

            <select
              value={filters.position}
              onChange={(e) =>
                updateQuery(
                  "position",
                  e.target.value,
                )
              }
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                px-4
                py-3
              "
            >
              <option value="">
                همه
              </option>

              <option value="HOME_HERO">
                اسلایدر اصلی
              </option>

              <option value="HOME_TOP">
                بالای صفحه
              </option>

              <option value="HOME_MIDDLE">
                وسط صفحه
              </option>

              <option value="HOME_BOTTOM">
                پایین صفحه
              </option>

              <option value="SIDEBAR">
                سایدبار
              </option>

              <option value="CATEGORY">
                صفحه دسته‌بندی
              </option>
            </select>
          </div>

          {/* Status */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              وضعیت
            </label>

            <select
              value={filters.status}
              onChange={(e) =>
                updateQuery(
                  "status",
                  e.target.value,
                )
              }
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                px-4
                py-3
              "
            >
              <option value="">
                همه
              </option>

              <option value="ACTIVE">
                فعال
              </option>

              <option value="INACTIVE">
                غیرفعال
              </option>
            </select>
          </div>

          {/* Sort */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              مرتب سازی
            </label>

            <select
              value={filters.sort}
              onChange={(e) =>
                updateQuery(
                  "sort",
                  e.target.value,
                )
              }
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                px-4
                py-3
              "
            >
              <option value="order">
                ترتیب نمایش
              </option>

              <option value="newest">
                جدیدترین
              </option>

              <option value="oldest">
                قدیمی‌ترین
              </option>

              <option value="title">
                عنوان
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between border-t pt-5">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Filter size={16} />

          <span>
            {totalBanners.toLocaleString("fa-IR")} بنر
          </span>
        </div>

        <button
          onClick={resetFilters}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            px-4
            py-2
            text-sm
            transition
            hover:bg-gray-50
          "
        >
          <RotateCcw size={16} />

          حذف فیلترها
        </button>
      </div>
    </div>
  );
}