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
    <div className={`rounded-2xl px-5 py-3 ${colorClass}`}>
      <p className="text-xs text-gray-500">{label}</p>
      <h3 className="mt-1 text-xl font-black">{value}</h3>
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
  // Format numbers with Persian locale (client-safe due to suppressHydrationWarning)
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
      className="overflow-hidden rounded-4xl border border-gray-100 bg-white shadow-sm"
    >
      <div className="p-8">
        {/* ---- Top section ---- */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left column */}
          <div>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-400">
              <Link href="/admin" className="transition hover:text-pink-500">
                داشبورد
              </Link>
              <ChevronLeft size={15} />
              <span className="font-medium text-gray-900">محصولات</span>
            </nav>

            {/* Title + icon */}
            <div className="mt-5 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-pink-100 text-pink-600">
                <Package size={30} />
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900">
                  مدیریت محصولات
                </h1>
                <p className="mt-2 text-gray-500">
                  مدیریت، افزودن، ویرایش و حذف محصولات فروشگاه
                </p>
              </div>
            </div>
          </div>

          {/* Right column – action buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button onClick={exportExcel} className="flex items-center gap-2 rounded-2xl border border-gray-200 px-5 py-3 font-semibold text-gray-700 transition hover:border-pink-300 hover:text-pink-600">
              <Download size={18} />
              خروجی Excel
            </button>

            <Link
              href="/admin/products/new"
              className="flex items-center gap-2 rounded-2xl bg-linear-to-r from-pink-500 to-rose-500 px-6 py-3 font-semibold text-white shadow-lg shadow-pink-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Plus size={20} />
              افزودن محصول
            </Link>
          </div>
        </div>

        {/* ---- Bottom stats ---- */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
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
