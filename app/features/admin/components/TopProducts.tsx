"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Star,
  TrendingUp,
  ShoppingCart,
  ChevronLeft,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "کرم آبرسان پوست",
    image: "/images/products/product-1.jpg",
    category: "مراقبت پوست",
    sales: 842,
    revenue: "245M",
    rating: 4.9,
    growth: "+18%",
  },
  {
    id: 2,
    name: "رژ لب مات",
    image: "/images/products/product-2.jpg",
    category: "آرایشی",
    sales: 631,
    revenue: "186M",
    rating: 4.8,
    growth: "+12%",
  },
  {
    id: 3,
    name: "سرم ویتامین C",
    image: "/images/products/product-3.jpg",
    category: "مراقبت پوست",
    sales: 522,
    revenue: "161M",
    rating: 4.7,
    growth: "+9%",
  },
  {
    id: 4,
    name: "ضد آفتاب SPF50",
    image: "/images/products/product-4.jpg",
    category: "پوست",
    sales: 418,
    revenue: "139M",
    rating: 4.8,
    growth: "+6%",
  },
];

export default function TopProducts() {
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
      {/* Header */}

      <div className="flex items-center justify-between border-b border-gray-100 p-4 sm:p-6">
        <div>
          <h2 className="text-lg font-black text-gray-900 sm:text-xl">
            محصولات پرفروش
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:mt-2 sm:text-sm">
            برترین محصولات این ماه
          </p>
        </div>

        <button
          className="
            hidden
            items-center
            gap-2

            rounded-2xl

            bg-pink-50

            px-4
            py-3

            text-sm
            font-semibold

            text-pink-600

            transition

            hover:bg-pink-100
            sm:flex
          "
        >
          مشاهده همه

          <ChevronLeft size={18} />
        </button>
      </div>

      {/* Products */}

      <div className="divide-y divide-gray-100">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              backgroundColor: "#fafafa",
            }}
            className="p-4 sm:p-5"
          >
            <div className="flex items-center justify-between">
              {/* Left */}

              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className="
                    relative

                    h-14
                    w-14

                    overflow-hidden

                    rounded-xl
                    sm:h-18
                    sm:w-18
                    sm:rounded-2xl

                    bg-gray-100
                  "
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900 sm:text-base">
                    {product.name}
                  </h3>

                  <p className="mt-0.5 text-xs text-gray-500 sm:mt-1 sm:text-sm">
                    {product.category}
                  </p>

                  <div className="mt-2 flex items-center gap-3 sm:mt-3 sm:gap-4">
                    <span className="flex items-center gap-1 text-xs text-amber-500 sm:text-sm">
                      <Star
                        size={14}
                        fill="currentColor"
                      />

                      {product.rating}
                    </span>

                    <span className="flex items-center gap-1 text-xs text-gray-500 sm:text-sm">
                      <ShoppingCart size={13} />

                      {product.sales}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right */}

              <div className="text-left">
                <h4 className="text-lg font-black text-gray-900 sm:text-2xl">
                  {product.revenue}
                </h4>

                <p className="mt-0.5 text-[10px] text-gray-400 sm:mt-1 sm:text-xs">
                  درآمد
                </p>

                <div
                  className="
                    mt-2

                    inline-flex
                    items-center
                    gap-1

                    rounded-full

                    bg-emerald-50

                    px-2
                    py-1
                    text-xs
                    font-bold

                    text-emerald-600
                    sm:mt-3
                    sm:px-3
                    sm:py-1.5
                    sm:text-sm
                  "
                >
                  <TrendingUp size={13} />

                  {product.growth}
                </div>
              </div>
            </div>

            {/* Progress */}

            <div className="mt-4 sm:mt-5">
              <div className="mb-1.5 flex items-center justify-between text-[10px] sm:mb-2 sm:text-xs">
                <span className="text-gray-500">
                  میزان فروش
                </span>

                <span className="font-semibold">
                  {product.sales} عدد
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-gray-100 sm:h-2">
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${90 - index * 15}%`,
                  }}
                  transition={{
                    duration: 1,
                    delay: index * 0.1,
                  }}
                  className="
                    h-full

                    rounded-full

                    bg-linear-to-r
                    from-pink-500
                    to-rose-500
                  "
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}