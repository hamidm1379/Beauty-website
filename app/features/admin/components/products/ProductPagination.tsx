"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface ProductPaginationProps {
  page?: number;
  totalPages?: number;
  totalItems?: number;
  perPage?: number;
}

export default function ProductPagination({
  page = 1,
  totalPages = 1,
  totalItems = 0,
  perPage = 12,
}: ProductPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const router = useRouter();

  const searchParams = useSearchParams();

  function changePage(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", newPage.toString());

    router.push(`/admin/products?${params.toString()}`);
  }

  function changeLimit(limit: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("limit", limit.toString());

    params.set("page", "1");

    router.push(`/admin/products?${params.toString()}`);
  }
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-gray-100 bg-white p-3 shadow-sm sm:rounded-4xl sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row items-center lg:justify-between">
        {/* Info */}

        <div className="text-xs text-gray-500 sm:text-sm">
          نمایش
          <span className="mx-1 font-bold text-pink-600">
            {((page - 1) * perPage + 1).toLocaleString("fa-IR")}
          </span>
          تا
          <span className="mx-1 font-bold text-pink-600">
            {Math.min(page * perPage, totalItems).toLocaleString("fa-IR")}
          </span>
          از
          <span className="mx-1 font-bold text-gray-900">
            {totalItems.toLocaleString("fa-IR")}
          </span>
          محصول
        </div>

        {/* Pagination */}

        <div className="flex items-center gap-1.5 overflow-x-auto sm:gap-2">
          {/* Prev */}

          <button
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-200 transition hover:border-pink-500 hover:text-pink-500 disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11 sm:rounded-2xl"
            onClick={() => changePage(page - 1)}
            disabled={page === 1}
          >
            <ChevronRight size={16} className="sm:hidden" />
            <ChevronRight size={18} className="hidden sm:block" />
          </button>

          {/* Numbers */}

          {pages.map((item) => (
            <button
              key={item}
              onClick={() => changePage(item)}
              className={`h-9 w-9 shrink-0 rounded-xl text-xs font-bold transition-all sm:h-11 sm:w-11 sm:rounded-2xl sm:text-sm ${item === page ? "bg-linear-to-r from-pink-500 to-rose-500 text-white shadow-lg" : "border border-gray-200 hover:border-pink-500 hover:text-pink-600"}`}
            >
              {item.toLocaleString("fa-IR")}
            </button>
          ))}

          {/* Next */}

          <button
            onClick={() => changePage(page + 1)}
            disabled={page === totalPages}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-200 transition hover:border-pink-500 hover:text-pink-500 disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11 sm:rounded-2xl"
          >
            <ChevronLeft size={16} className="sm:hidden" />
            <ChevronLeft size={18} className="hidden sm:block" />
          </button>
        </div>

        {/* Per Page */}

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xs text-gray-500 sm:text-sm">تعداد نمایش</span>

          <select
            value={perPage}
            onChange={(e) => changeLimit(Number(e.target.value))}
            className="h-9 rounded-xl border border-gray-200 px-3 text-xs outline-none focus:border-pink-500 sm:h-11 sm:rounded-2xl sm:px-4 sm:text-sm"
          >
            <option value={10}>۱۰</option>
            <option value={20}>۲۰</option>
            <option value={50}>۵۰</option>
            <option value={100}>۱۰۰</option>
          </select>
        </div>
      </div>
    </motion.section>
  );
}