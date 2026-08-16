"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Star,
  TrendingUp,
  ShoppingCart,
  ChevronLeft,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  sales: number;
  revenue: string;
}

interface Props {
  products: Product[];
}

export default function TopProducts({ products }: Props) {
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

        rounded-2xl
        sm:rounded-3xl
        lg:rounded-4xl

        border
        border-gray-100

        bg-white

        shadow-sm
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-gray-100 p-3 sm:p-4 lg:p-6">
        <div>
          <h2 className="text-base font-black text-gray-900 sm:text-lg lg:text-xl">
            محصولات پرفروش
          </h2>

          <p className="mt-0.5 text-[10px] text-gray-500 sm:mt-1 sm:text-xs lg:mt-2 lg:text-sm">
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
        {products.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-400">
            محصولی یافت نشد
          </div>
        ) : (
          products.map((product, index) => (
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
              className="p-3 sm:p-4 lg:p-5"
            >
              <div className="flex items-center justify-between">
                {/* Left */}

                <div className="flex items-center gap-2.5 sm:gap-3 lg:gap-4">
                  <div
                    className="
                      relative

                      h-11
                      w-11

                      overflow-hidden

                      rounded-lg
                      sm:h-14
                      sm:w-14
                      sm:rounded-xl
                      lg:h-18
                      lg:w-18
                      lg:rounded-2xl

                      bg-gray-100
                    "
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-gray-900 sm:text-sm lg:text-base">
                      {product.name}
                    </h3>

                    <p className="mt-0.5 text-[10px] text-gray-500 sm:text-xs lg:mt-1 lg:text-sm">
                      {product.category}
                    </p>

                    <div className="mt-1.5 flex items-center gap-2 sm:mt-2 sm:gap-3 lg:mt-3 lg:gap-4">
                      <span className="flex items-center gap-1 text-[10px] text-amber-500 sm:text-xs lg:text-sm">
                        <Star
                          size={12}
                          fill="currentColor"
                          className="sm:hidden"
                        />
                        <Star
                          size={14}
                          fill="currentColor"
                          className="hidden sm:block"
                        />
                      </span>

                      <span className="flex items-center gap-1 text-[10px] text-gray-500 sm:text-xs lg:text-sm">
                        <ShoppingCart
                          size={11}
                          className="sm:hidden"
                        />
                        <ShoppingCart
                          size={13}
                          className="hidden sm:block"
                        />

                        {product.sales.toLocaleString("fa-IR")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right */}

                <div className="text-left">
                  <h4 className="text-sm font-black text-gray-900 sm:text-lg lg:text-2xl">
                    {product.revenue}
                  </h4>

                  <p className="mt-0.5 text-[9px] text-gray-400 sm:text-[10px] lg:mt-1 lg:text-xs">
                    درآمد
                  </p>

                  <div
                    className="
                      mt-1.5

                      inline-flex
                      items-center
                      gap-0.5

                      rounded-full

                      bg-emerald-50

                      px-1.5
                      py-0.5
                      text-[10px]
                      font-bold

                      text-emerald-600
                      sm:mt-2
                      sm:gap-1
                      sm:px-2
                      sm:py-1
                      sm:text-xs
                      lg:mt-3
                      lg:px-3
                      lg:py-1.5
                      lg:text-sm
                    "
                  >
                    <TrendingUp size={10} className="sm:hidden" />
                    <TrendingUp size={13} className="hidden sm:block" />

                    {product.sales.toLocaleString("fa-IR")} فروش
                  </div>
                </div>
              </div>

              {/* Progress */}

              <div className="mt-3 sm:mt-4 lg:mt-5">
                <div className="mb-1 flex items-center justify-between text-[9px] sm:mb-1.5 sm:text-[10px] lg:mb-2 lg:text-xs">
                  <span className="text-gray-500">
                    میزان فروش
                  </span>

                  <span className="font-semibold">
                    {product.sales.toLocaleString("fa-IR")} عدد
                  </span>
                </div>

                <div className="h-1 overflow-hidden rounded-full bg-gray-100 sm:h-1.5 lg:h-2">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${Math.max(20, 100 - index * 20)}%`,
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
          ))
        )}
      </div>
    </motion.section>
  );
}
