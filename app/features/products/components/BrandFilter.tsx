"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Brand {
  id: number;
  title: string;
  slug: string;
  count?: number;
}

interface Props {
  brands: Brand[];
  value: string[];
  onChange: (value: string[]) => void;
}

export default function BrandFilter({
  brands,
  value,
  onChange,
}: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b border-gray-100 py-5">
      {/* Header */}

      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between font-semibold"
      >
        <span>برند</span>

        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Body */}

      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "mt-5 max-h-96" : "max-h-0"
        }`}
      >
        <div className="space-y-3">
          {brands.map((brand) => (
            <label
              key={brand.id}
              className="group flex cursor-pointer items-center justify-between rounded-xl px-2 py-2 transition hover:bg-pink-50"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={value.includes(brand.slug)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onChange([...value, brand.slug]);
                    } else {
                      onChange(
                        value.filter((item) => item !== brand.slug)
                      );
                    }
                  }}
                  className="cursor-pointer h-4 w-4 accent-pink-500"
                />

                <span className="text-sm text-gray-700 group-hover:text-pink-500">
                  {brand.title}
                </span>
              </div>

              {brand.count !== undefined && (
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                  {brand.count.toLocaleString("fa-IR")}
                </span>
              )}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}