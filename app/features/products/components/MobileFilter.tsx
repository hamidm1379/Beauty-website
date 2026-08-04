"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import FilterSidebar from "@/app/features/products/components/FilterSidebar";

interface Props {
  categories: { id: number; title: string; slug: string }[];
  brands: { id: number; title: string; slug: string; logo?: string | null }[];
}

export default function MobileFilter({ categories, brands }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white/80 px-4 py-2.5 text-sm font-medium text-pink-600 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-pink-200 hover:bg-pink-50/70 hover:shadow-md active:scale-95 active:bg-pink-100/50 focus:outline-none focus:ring-2 focus:ring-pink-400/50 lg:hidden"
      >
        <Menu
          size={18}
          className="transition-transform duration-300 hover:rotate-12"
        />
        فیلترها
      </button>

      {/* Overlay */}
      <div
        className={`
          fixed inset-0 z-50 bg-black/40 transition-opacity
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <aside
        className={`
          fixed top-0 right-0 z-50
          h-screen w-80 max-w-[90vw]
          bg-white p-6 shadow-xl
          transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="mb-4 flex justify-between items-center">
          <h3 className="font-bold text-lg">فیلترها</h3>

          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-80px)]">
          <FilterSidebar categories={categories} brands={brands} />
        </div>
      </aside>
    </>
  );
}
