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
        rounded-2xl
        border
        border-gray-100
        bg-white
        p-4

        shadow-sm

        sm:rounded-3xl
        sm:p-5

        xl:rounded-4xl
        xl:p-6
      "
    >
      <div
        className="
          flex
          flex-col
          gap-3

          sm:gap-4

          xl:flex-row
          xl:items-center
          xl:justify-between
          xl:gap-5
        "
      >
        {/* Search */}

        <div className="relative w-full xl:max-w-md">
          <Search
            size={16}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-gray-400

              sm:right-4
              sm:size-[18px]
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
              h-10
              w-full
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              pr-9
              pl-3
              text-xs
              outline-none
              transition
              focus:border-pink-500
              focus:bg-white

              sm:h-11
              sm:rounded-2xl
              sm:pr-10
              sm:pl-4
              sm:text-sm

              xl:h-12
            "
          />
        </div>

        {/* Filters */}

        <div
          className="
            grid
            grid-cols-2
            gap-2

            sm:flex
            sm:flex-wrap
            sm:items-center
            sm:gap-3
          "
        >
          <select
            value={filters.category}
            onChange={(e) => updateFilter("category", e.target.value)}
            className="
              h-10
              w-full
              rounded-xl
              border
              border-gray-200
              bg-white
              px-3
              text-xs
              outline-none
              transition
              focus:border-pink-500

              sm:h-11
              sm:w-auto
              sm:rounded-2xl
              sm:px-4
              sm:text-sm

              xl:h-12
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
              h-10
              w-full
              rounded-xl
              border
              border-gray-200
              bg-white
              px-3
              text-xs
              outline-none
              transition
              focus:border-pink-500

              sm:h-11
              sm:w-auto
              sm:rounded-2xl
              sm:px-4
              sm:text-sm

              xl:h-12
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
              h-10
              w-full
              rounded-xl
              border
              border-gray-200
              bg-white
              px-3
              text-xs
              outline-none
              transition
              focus:border-pink-500

              sm:h-11
              sm:w-auto
              sm:rounded-2xl
              sm:px-4
              sm:text-sm

              xl:h-12
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
              h-10
              w-full
              rounded-xl
              border
              border-gray-200
              bg-white
              px-3
              text-xs
              outline-none
              transition
              focus:border-pink-500

              sm:h-11
              sm:w-auto
              sm:rounded-2xl
              sm:px-4
              sm:text-sm

              xl:h-12
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
          mt-4

          flex
          flex-wrap
          items-center
          justify-between

          gap-2

          sm:mt-6
          sm:gap-4
        "
      >
        <div className="flex flex-1 items-center gap-2 sm:flex-none sm:gap-3">
          <button
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-1.5

              rounded-xl

              border
              border-gray-200

              px-3
              py-2

              text-xs
              font-medium

              transition

              hover:border-pink-400
              hover:text-pink-600

              sm:flex-none
              sm:justify-start
              sm:gap-2
              sm:rounded-2xl
              sm:px-4
              sm:py-3
              sm:text-sm
            "
          >
            <RefreshCcw size={15} className="sm:size-[17px]" />
            بروزرسانی
          </button>

          <button
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-1.5

              rounded-xl

              border
              border-red-200

              px-3
              py-2

              text-xs
              font-medium

              text-red-500

              transition

              hover:bg-red-50

              sm:flex-none
              sm:justify-start
              sm:gap-2
              sm:rounded-2xl
              sm:px-4
              sm:py-3
              sm:text-sm
            "
          >
            <Trash2 size={15} className="sm:size-[17px]" />
            حذف گروهی
          </button>
        </div>
      </div>
    </motion.section>
  );
}