"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Download, Package, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
// ----------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------
interface ProductsHeaderProps {
  totalProducts: number;
  activeProducts: number;
  outOfStockProducts: number;
  totalCategories: number;
}

interface StatCardProps {
  label: string;
  value: string;
  colorClass: string; // Tailwind color classes for background & text
}

// ----------------------------------------------------------------------
// Sub-components
// ----------------------------------------------------------------------
function StatCard({ label, value, colorClass }: StatCardProps) {
  return (
    <div className={`rounded-xl px-3 py-2 sm:rounded-2xl sm:px-5 sm:py-3 ${colorClass}`}>
      <p className="text-[11px] text-gray-500 sm:text-xs">{label}</p>
      <h3 className="mt-0.5 text-base font-black sm:mt-1 sm:text-xl">{value}</h3>
    </div>
  );
}

// ----------------------------------------------------------------------
// Main component
// ----------------------------------------------------------------------
export default function ProductsHeader({
  totalProducts,
  activeProducts,
  outOfStockProducts,
  totalCategories,
}: ProductsHeaderProps) {
  const format = (n: number) => n.toLocaleString("fa-IR");

  async function exportExcel() {
    try {
      const response = await fetch("/api/products/export");

      if (!response.ok) {
        throw new Error();
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "products.xlsx";
      link.click();

      window.URL.revokeObjectURL(url);

      toast.success("فایل اکسل دانلود شد.");
    } catch {
      toast.error("خطا در دریافت فایل.");
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm sm:rounded-3xl md:rounded-4xl"
    >
      <div className="p-4 sm:p-6 md:p-8">
        {/* ---- Top section ---- */}
        <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left column */}
          <div className="min-w-0">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 sm:gap-2 sm:text-sm">
              <Link href="/admin" className="transition hover:text-pink-500">
                داشبورد
              </Link>
              <ChevronLeft size={13} className="shrink-0 sm:size-[15px]" />
              <span className="font-medium text-gray-900">محصولات</span>
            </nav>

            {/* Title + icon */}
            <div className="mt-3 flex items-center gap-3 sm:mt-5 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-pink-600 sm:h-16 sm:w-16 sm:rounded-3xl">
                <Package size={22} className="sm:hidden" />
                <Package size={30} className="hidden sm:block" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg font-black text-gray-900 sm:text-2xl md:text-3xl">
                  مدیریت محصولات
                </h1>
                <p className="mt-1 text-xs text-gray-500 sm:mt-2 sm:text-base">
                  مدیریت، افزودن، ویرایش و حذف محصولات فروشگاه
                </p>
              </div>
            </div>
          </div>

          {/* Right column – action buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <button
              onClick={exportExcel}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-pink-300 hover:text-pink-600 sm:w-auto sm:rounded-2xl sm:px-5 sm:py-3 sm:text-base"
            >
              <Download size={16} className="sm:hidden" />
              <Download size={18} className="hidden sm:block" />
              خروجی Excel
            </button>

            <Link
              href="/admin/products/new"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-pink-500 to-rose-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl sm:w-auto sm:rounded-2xl sm:px-6 sm:py-3 sm:text-base"
            >
              <Plus size={18} className="sm:hidden" />
              <Plus size={20} className="hidden sm:block" />
              افزودن محصول
            </Link>
          </div>
        </div>

        {/* ---- Bottom stats ---- */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
          <StatCard
            label="تعداد محصولات"
            value={format(totalProducts)}
            colorClass="bg-pink-50 text-pink-600"
          />
          <StatCard
            label="محصولات فعال"
            value={format(activeProducts)}
            colorClass="bg-green-50 text-green-600"
          />
          <StatCard
            label="ناموجود"
            value={format(outOfStockProducts)}
            colorClass="bg-orange-50 text-orange-600"
          />
          <StatCard
            label="دسته‌بندی‌ها"
            value={format(totalCategories)}
            colorClass="bg-sky-50 text-sky-600"
          />
        </div>
      </div>
    </motion.section>
  );
}