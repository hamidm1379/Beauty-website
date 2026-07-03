"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface ProductsHeaderProps {
  title?: string;
  totalProducts?: number;
}

export default function ProductsHeader({
  title = "محصولات آرایشی",
  totalProducts = 245,
}: ProductsHeaderProps) {
  return (
    <section className="mb-8 rounded-3xl border border-gray-200 bg-white px-8 py-8 shadow-sm">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: .5,
        }}
      >
        {/* Breadcrumb */}

        <nav className="mb-5 flex items-center gap-2 text-sm text-gray-500">
          <Link
            href="/"
            className="transition hover:text-pink-500"
          >
            خانه
          </Link>

          <ChevronLeft size={15} />

          <span className="font-medium text-gray-900">
            محصولات
          </span>
        </nav>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          {/* Left */}

          <div>
            <h1 className="text-4xl font-black text-gray-900">
              {title}
            </h1>

            <p className="mt-3 max-w-2xl leading-8 text-gray-500">
              مجموعه‌ای از بهترین محصولات آرایشی، مراقبت پوست و مو از
              برندهای معتبر دنیا با تضمین اصالت کالا و ارسال سریع.
            </p>
          </div>

          {/* Right */}

          <motion.div
            whileHover={{
              y: -4,
            }}
            className="rounded-2xl border border-pink-100 bg-pink-50 px-8 py-5"
          >
            <div className="text-center">
              <p className="text-4xl font-black text-pink-600">
                {totalProducts.toLocaleString("fa-IR")}
              </p>

              <span className="mt-2 block text-sm font-medium text-gray-600">
                محصول موجود
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}