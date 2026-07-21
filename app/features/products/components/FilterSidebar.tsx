"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import CategoryFilter from "@/app/features/products/components/CategoryFilter";
import BrandFilter from "@/app/features/products/components/BrandFilter";
// import PriceFilter from "@/app/features/products/components/PriceFilter";
import { brandRepository } from "@/lib/repositories/brand.repository";

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

interface Props {
  categories: Category[];
  brands: Brand[];
}

export default  function FilterSidebar({ categories, brands }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState<string[]>(
    searchParams.getAll("category"),
  );

  const [brand, setBrand] = useState<string[]>(searchParams.getAll("brand"));

  const [available, setAvailable] = useState(
    searchParams.get("available") === "true",
  );

  function applyFilters() {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    params.delete("category");

    category.forEach((item) => {
      params.append("category", item);
    });

    params.delete("brand");

    brand.forEach((item) => {
      params.append("brand", item);
    });

    if (available) params.set("available", "true");
    else params.delete("available");

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  function resetFilters() {
    const params = new URLSearchParams(searchParams);

    params.delete("category");
    params.delete("brand");
    params.delete("available");
    params.set("page", "1");

    setCategory([]);
    setBrand([]);
    setAvailable(false);

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }
  function updateFilters(
    nextCategory = category,
    nextBrand = brand,
    nextAvailable = available,
  ) {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    params.delete("category");
    nextCategory.forEach((item) => params.append("category", item));

    params.delete("brand");

    nextBrand.forEach((item) => {
      params.append("brand", item);
    });

    if (nextAvailable) params.set("available", "true");
    else params.delete("available");

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }
  return (
    <aside className="sticky top-24 h-fit rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold">فیلتر محصولات</h3>

        <button
          onClick={resetFilters}
          className="cursor-pointer flex items-center gap-1 text-sm text-pink-500"
        >
          <RotateCcw size={15} />
          حذف
        </button>
      </div>

      <CategoryFilter
        categories={categories}
        value={category}
        onChange={(value) => {
          setCategory(value);
          updateFilters(value, brand, available);
        }}
      />

      <BrandFilter
        brands={brands}
        value={brand}
        onChange={(value) => {
          setBrand(value);
          updateFilters(category, value, available);
        }}
      />

      {/* <PriceFilter /> */}

      {/* <div className="py-6">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
            type="checkbox"
            className="h-4 w-4 rounded accent-pink-500"
          />

          <span className="text-sm">فقط کالاهای موجود</span>
        </label>
      </div> */}

      {/* <button
        onClick={applyFilters}
        className="mt-2 w-full rounded-2xl bg-pink-500 py-3 font-semibold text-white"
      >
        اعمال فیلتر
      </button> */}
    </aside>
  );
}
