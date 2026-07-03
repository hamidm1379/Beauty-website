"use client";

import { ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";

const brands = [
  { id: 1, name: "L'Oréal", count: 42 },
  { id: 2, name: "CeraVe", count: 31 },
  { id: 3, name: "Bioderma", count: 25 },
  { id: 4, name: "Vichy", count: 18 },
  { id: 5, name: "The Ordinary", count: 22 },
  { id: 6, name: "La Roche Posay", count: 19 },
  { id: 7, name: "Nivea", count: 16 },
  { id: 8, name: "Maybelline", count: 27 },
  { id: 9, name: "Essence", count: 15 },
  { id: 10, name: "Golden Rose", count: 20 },
];

export default function BrandFilter() {
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState("");

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) =>
      brand.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="border-b border-gray-100 py-5">
      {/* Header */}

      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between font-semibold cursor-pointer"
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
          open ? "mt-5 max-h-125" : "max-h-0"
        }`}
      >
        {/* Search */}

        <div className="relative mb-4">
          <Search
            size={17}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجوی برند..."
            className="
              w-full

              rounded-xl

              border
              border-gray-200

              py-2
              pr-10
              pl-3

              text-sm

              outline-none

              transition

              focus:border-pink-500
            "
          />
        </div>

        {/* Brand List */}

        <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
          {filteredBrands.map((brand) => (
            <label
              key={brand.id}
              className="
                group

                flex
                cursor-pointer
                items-center
                justify-between

                rounded-xl

                px-2
                py-2

                transition-all

                hover:bg-pink-50
              "
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-pink-500"
                />

                <span className="text-sm text-gray-700 group-hover:text-pink-500">
                  {brand.name}
                </span>
              </div>

              <span
                className="
                  rounded-full

                  bg-gray-100

                  px-2
                  py-0.5

                  text-xs

                  text-gray-500
                "
              >
                {brand.count}
              </span>
            </label>
          ))}

          {filteredBrands.length === 0 && (
            <div className="py-4 text-center text-sm text-gray-400">
              برندی پیدا نشد.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}