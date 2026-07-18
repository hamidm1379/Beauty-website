"use client";

import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

import { Search, RefreshCcw, Trash2, Filter } from "lucide-react";
interface Category {
  id: number;
  title: string;
  slug: string;
}

interface Brand {
  id: number;
  title: string;
  slug: string;
}

interface ToolbarFilters {
  search: string;
  category: string;
  brand: string;
  status: string;
  sort: string;
  page: number;
}

interface ProductToolbarProps {
  categories: Category[];
  brands: Brand[];

  filters: ToolbarFilters;

  totalProducts: number;
}

export default function ProductToolbar({
  categories,
  brands,
  filters,
  totalProducts,
}: ProductToolbarProps) {
  const router = useRouter();

  const searchParams = useSearchParams();

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.delete("page");

    router.push(`/admin/products?${params.toString()}`);
  }
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        rounded-4xl
        border
        border-gray-100
        bg-white
        p-6
        shadow-sm
      "
    >
      <div
        className="
          flex
          flex-col
          gap-5

          xl:flex-row
          xl:items-center
          xl:justify-between
        "
      >
        {/* Search */}

        <div className="relative w-full xl:max-w-md">
          <Search
            size={18}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            defaultValue={filters.search}
            placeholder="جستجوی نام محصول..."
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;

              updateFilter("search", (e.target as HTMLInputElement).value);
            }}
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              pr-11
              pl-4
              text-sm
              outline-none
              transition
              focus:border-pink-500
              focus:bg-white
            "
          />
        </div>

        {/* Filters */}

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-3
          "
        >
          <select
            value={filters.category}
            onChange={(e) => updateFilter("category", e.target.value)}
            className="
              h-12
              rounded-2xl
              border
              border-gray-200
              bg-white
              px-4
              text-sm
              outline-none
              transition
              focus:border-pink-500
            "
          >
            <option value="">همه دسته‌بندی‌ها</option>

            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.title}
              </option>
            ))}
          </select>
          <select
            value={filters.brand}
            onChange={(e) => updateFilter("brand", e.target.value)}
            className="
    h-12
    rounded-2xl
    border
    border-gray-200
    bg-white
    px-4
    text-sm
    outline-none
    transition
    focus:border-pink-500
  "
          >
            <option value="">همه برندها</option>

            {brands.map((brand) => (
              <option key={brand.id} value={brand.slug}>
                {brand.title}
              </option>
            ))}
          </select>
          <select
            value={filters.status}
            onChange={(e) => updateFilter("status", e.target.value)}
            className="
    h-12
    rounded-2xl
    border
    border-gray-200
    bg-white
    px-4
    text-sm
    outline-none
    transition
    focus:border-pink-500
  "
          >
            <option value="">همه وضعیت‌ها</option>

            <option value="ACTIVE">فعال</option>

            <option value="INACTIVE">غیرفعال</option>

            <option value="DRAFT">پیش‌نویس</option>
          </select>

          <select
            value={filters.sort}
            onChange={(e) => updateFilter("sort", e.target.value)}
            className="
    h-12
    rounded-2xl
    border
    border-gray-200
    bg-white
    px-4
    text-sm
    outline-none
    transition
    focus:border-pink-500
  "
          >
            <option value="newest">جدیدترین</option>

            <option value="oldest">قدیمی‌ترین</option>

            <option value="price-desc">بیشترین قیمت</option>

            <option value="price-asc">کمترین قیمت</option>

            <option value="stock-desc">بیشترین موجودی</option>
          </select>
        </div>
      </div>

      {/* Bottom */}

      <div
        className="
          mt-6

          flex
          flex-wrap
          items-center
          justify-between

          gap-4
        "
      >
        <div className="flex items-center gap-3">
          <button
            className="
              flex
              items-center
              gap-2

              rounded-2xl

              border
              border-gray-200

              px-4
              py-3

              text-sm
              font-medium

              transition

              hover:border-pink-400
              hover:text-pink-600
            "
          >
            <RefreshCcw size={17} />
            بروزرسانی
          </button>

          <button
            className="
              flex
              items-center
              gap-2

              rounded-2xl

              border
              border-red-200

              px-4
              py-3

              text-sm
              font-medium

              text-red-500

              transition

              hover:bg-red-50
            "
          >
            <Trash2 size={17} />
            حذف گروهی
          </button>
        </div>
      </div>
    </motion.section>
  );
}
