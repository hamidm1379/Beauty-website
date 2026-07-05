"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ProductPaginationProps {
  page?: number;
  totalPages?: number;
  totalItems?: number;
  perPage?: number;
}

export default function ProductPagination({
  page = 1,
  totalPages = 12,
  totalItems = 245,
  perPage = 10,
}: ProductPaginationProps) {
  const pages = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );

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
          gap-6

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* Info */}

        <div className="text-sm text-gray-500">
          نمایش

          <span className="mx-1 font-bold text-pink-600">
            {((page - 1) * perPage + 1).toLocaleString("fa-IR")}
          </span>

          تا

          <span className="mx-1 font-bold text-pink-600">
            {Math.min(
              page * perPage,
              totalItems
            ).toLocaleString("fa-IR")}
          </span>

          از

          <span className="mx-1 font-bold text-gray-900">
            {totalItems.toLocaleString("fa-IR")}
          </span>

          محصول
        </div>

        {/* Pagination */}

        <div className="flex items-center gap-2">
          {/* Prev */}

          <button
            disabled={page === 1}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center

              rounded-2xl

              border
              border-gray-200

              transition

              hover:border-pink-500
              hover:text-pink-500

              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <ChevronRight size={18} />
          </button>

          {/* Numbers */}

          {pages.map((item) => (
            <button
              key={item}
              className={`
                h-11
                w-11

                rounded-2xl

                text-sm
                font-bold

                transition-all

                ${
                  item === page
                    ? "bg-linear-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                    : "border border-gray-200 hover:border-pink-500 hover:text-pink-600"
                }
              `}
            >
              {item.toLocaleString("fa-IR")}
            </button>
          ))}

          {/* Next */}

          <button
            disabled={page === totalPages}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center

              rounded-2xl

              border
              border-gray-200

              transition

              hover:border-pink-500
              hover:text-pink-500

              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <ChevronLeft size={18} />
          </button>
        </div>

        {/* Per Page */}

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            تعداد نمایش
          </span>

          <select
            className="
              h-11

              rounded-2xl

              border
              border-gray-200

              px-4

              text-sm

              outline-none

              focus:border-pink-500
            "
            defaultValue={perPage}
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