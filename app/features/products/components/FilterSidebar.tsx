"use client";

import { RotateCcw } from "lucide-react";
import CategoryFilter from "@/app/features/products/components/CategoryFilter";
import BrandFilter from "@/app/features/products/components/BrandFilter";
import PriceFilter from "@/app/features/products/components/PriceFilter";

// Removed unused categories and brands arrays

export default function FilterSidebar() {
  return (
    <aside
      className="
      sticky
      top-24

      h-fit

      rounded-3xl

      border
      border-gray-100

      bg-white

      p-6

      shadow-sm
    "
    >
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">فیلتر محصولات</h3>

        <button
          className="
          flex
          items-center
          gap-1

          text-sm

          text-pink-500

          hover:text-pink-600
        "
        >
          <RotateCcw size={15} />
          حذف
        </button>
      </div>

      {/* Category */}

      <CategoryFilter />

      {/* Brand */}

      <BrandFilter />
      {/* Price */}

      <PriceFilter/>

      {/* Availability */}

      <div className="py-6">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            className="
            h-4
            w-4

            rounded

            accent-pink-500
          "
          />

          <span className="text-sm text-gray-600">فقط کالاهای موجود</span>
        </label>
      </div>

      {/* Button */}

      <button
        className="
        mt-2

        w-full

        rounded-2xl

        bg-pink-500

        py-3

        font-semibold

        text-white

        transition-all

        hover:bg-pink-600
      "
      >
        اعمال فیلتر
      </button>
    </aside>
  );
}
