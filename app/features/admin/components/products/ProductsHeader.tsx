"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus,
  Download,
  Package,
  ChevronLeft,
} from "lucide-react";

interface ProductsHeaderProps {
  totalProducts?: number;
}

export default function ProductsHeader({
  totalProducts = 245,
}: ProductsHeaderProps) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        overflow-hidden

        rounded-4xl

        border
        border-gray-100

        bg-white

        shadow-sm
      "
    >
      <div className="p-8">
        {/* Top */}

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
          {/* Left */}

          <div>
            {/* Breadcrumb */}

            <nav className="flex items-center gap-2 text-sm text-gray-400">
              <Link
                href="/admin"
                className="transition hover:text-pink-500"
              >
                داشبورد
              </Link>

              <ChevronLeft size={15} />

              <span className="font-medium text-gray-900">
                محصولات
              </span>
            </nav>

            {/* Title */}

            <div className="mt-5 flex items-center gap-4">
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center

                  rounded-3xl

                  bg-pink-100

                  text-pink-600
                "
              >
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

          {/* Right */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-4
            "
          >
            {/* Export */}

            <button
              className="
                flex
                items-center
                gap-2

                rounded-2xl

                border
                border-gray-200

                px-5
                py-3

                font-semibold

                text-gray-700

                transition

                hover:border-pink-300
                hover:text-pink-600
              "
            >
              <Download size={18} />

              خروجی Excel
            </button>

            {/* Add */}

            <Link
              href="/admin/products/create"
              className="
                flex
                items-center
                gap-2

                rounded-2xl

                bg-linear-to-r
                from-pink-500
                to-rose-500

                px-6
                py-3

                font-semibold

                text-white

                shadow-lg
                shadow-pink-500/20

                transition-all

                hover:-translate-y-0.5
                hover:shadow-xl
              "
            >
              <Plus size={20} />

              افزودن محصول
            </Link>
          </div>
        </div>

        {/* Bottom */}

        <div
          className="
            mt-8

            flex
            flex-wrap
            items-center
            gap-4
          "
        >
          <div
            className="
              rounded-2xl

              bg-pink-50

              px-5
              py-3
            "
          >
            <p className="text-xs text-gray-500">
              تعداد محصولات
            </p>

            <h3
              className="mt-1 text-xl font-black text-pink-600"
              suppressHydrationWarning
            >
              {totalProducts.toLocaleString("fa-IR")}
            </h3>
          </div>

          <div
            className="
              rounded-2xl

              bg-green-50

              px-5
              py-3
            "
          >
            <p className="text-xs text-gray-500">
              محصولات فعال
            </p>

            <h3 className="mt-1 text-xl font-black text-green-600">
              ۲۲۱
            </h3>
          </div>

          <div
            className="
              rounded-2xl

              bg-orange-50

              px-5
              py-3
            "
          >
            <p className="text-xs text-gray-500">
              ناموجود
            </p>

            <h3 className="mt-1 text-xl font-black text-orange-600">
              ۲۴
            </h3>
          </div>

          <div
            className="
              rounded-2xl

              bg-sky-50

              px-5
              py-3
            "
          >
            <p className="text-xs text-gray-500">
              دسته‌بندی‌ها
            </p>

            <h3 className="mt-1 text-xl font-black text-sky-600">
              ۱۸
            </h3>
          </div>
        </div>
      </div>
    </motion.section>
  );
}