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

      <div className="flex items-center justify-between border-b border-gray-100 p-6">
        <div>
          <h2 className="text-xl font-black text-gray-900">
            محصولات پرفروش
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            برترین محصولات این ماه
          </p>
        </div>

        <button
          className="
            flex
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
            className="p-5"
          >
            <div className="flex items-center justify-between">
              {/* Left */}

              <div className="flex items-center gap-4">
                <div
                  className="
                    relative

                    h-18
                    w-18

                    overflow-hidden

                    rounded-2xl

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
                  <h3 className="font-bold text-gray-900">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>

                  <div className="mt-3 flex items-center gap-4">
                    <span className="flex items-center gap-1 text-amber-500">
                      <Star
                        size={16}
                        fill="currentColor"
                      />

                      {product.rating}
                    </span>

                    <span className="flex items-center gap-1 text-gray-500">
                      <ShoppingCart size={15} />

                      {product.sales}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right */}

              <div className="text-left">
                <h4 className="text-2xl font-black text-gray-900">
                  {product.revenue}
                </h4>

                <p className="mt-1 text-xs text-gray-400">
                  درآمد
                </p>

                <div
                  className="
                    mt-3

                    inline-flex
                    items-center
                    gap-1

                    rounded-full

                    bg-emerald-50

                    px-3
                    py-1.5

                    text-sm
                    font-bold

                    text-emerald-600
                  "
                >
                  <TrendingUp size={15} />

                  {product.growth}
                </div>
              </div>
            </div>

            {/* Progress */}

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  میزان فروش
                </span>

                <span className="font-semibold">
                  {product.sales} عدد
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
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