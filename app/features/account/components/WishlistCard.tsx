"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowLeft,
  Star,
} from "lucide-react";

const wishlist = [
  {
    id: 1,
    title: "کرم آبرسان هیالورونیک",
    brand: "La Roche Posay",
    image: "/products/1.jpg",
    price: "۱,۲۹۰,۰۰۰",
    rate: 4.9,
    inStock: true,
  },
  {
    id: 2,
    title: "سرم ویتامین C",
    brand: "The Ordinary",
    image: "/products/2.jpg",
    price: "۹۵۰,۰۰۰",
    rate: 4.8,
    inStock: true,
  },
  {
    id: 3,
    title: "ضد آفتاب SPF50",
    brand: "Bioderma",
    image: "/products/3.jpg",
    price: "۷۸۰,۰۰۰",
    rate: 4.7,
    inStock: false,
  },
];

export default function WishlistCard() {
  return (
    <section className="rounded-[34px] border border-gray-100 bg-white p-8 shadow-sm">
      {/* Header */}

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-600">
            علاقه‌مندی‌ها
          </span>

          <h2 className="mt-4 text-3xl font-black text-gray-900">
            لیست علاقه‌مندی‌های شما
          </h2>

          <p className="mt-2 text-gray-500">
            محصولاتی که برای خرید بعدی ذخیره کرده‌اید.
          </p>
        </div>

        <Link
          href="/account/wishlist"
          className="
            inline-flex
            items-center
            gap-2

            rounded-2xl

            bg-pink-500

            px-6
            py-3

            font-semibold

            text-white

            transition

            hover:bg-pink-600
          "
        >
          مشاهده همه

          <ArrowLeft size={18} />
        </Link>
      </div>

      {/* Products */}

      <div className="grid gap-6 lg:grid-cols-3">
        {wishlist.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: index * 0.1,
            }}
            whileHover={{
              y: -6,
            }}
            className="
              group

              overflow-hidden

              rounded-[28px]

              border
              border-gray-100

              bg-white

              shadow-sm

              transition-all

              hover:border-pink-200
              hover:shadow-xl
            "
          >
            {/* Image */}

            <div className="relative overflow-hidden bg-gray-50">
              <Image
                src={product.image}
                alt={product.title}
                width={500}
                height={500}
                className="
                  aspect-square
                  w-full

                  object-cover

                  transition
                  duration-500

                  group-hover:scale-110
                "
              />

              <button
                className="
                  absolute
                  left-4
                  top-4

                  flex
                  h-11
                  w-11
                  items-center
                  justify-center

                  rounded-full

                  bg-white/90

                  text-pink-500

                  backdrop-blur

                  shadow
                "
              >
                <Heart
                  size={18}
                  className="fill-pink-500"
                />
              </button>
            </div>

            {/* Body */}

            <div className="p-6">
              <span className="text-sm text-pink-500">
                {product.brand}
              </span>

              <h3 className="mt-2 line-clamp-2 h-14 text-lg font-bold leading-7 text-gray-900">
                {product.title}
              </h3>

              <div className="mt-3 flex items-center gap-2">
                <Star
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />

                <span className="font-semibold">
                  {product.rate}
                </span>
              </div>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <h4 className="text-2xl font-black text-pink-600">
                    {product.price}
                  </h4>

                  <span className="text-sm text-gray-500">
                    تومان
                  </span>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    product.inStock
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {product.inStock
                    ? "موجود"
                    : "ناموجود"}
                </span>
              </div>

              {/* Buttons */}

              <div className="mt-6 flex gap-3">
                <motion.button
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="
                    flex-1

                    rounded-2xl

                    bg-linear-to-r
                    from-pink-500
                    to-rose-500

                    py-3

                    font-semibold

                    text-white

                    transition

                    hover:shadow-lg
                  "
                >
                  <span className="flex items-center justify-center gap-2">
                    <ShoppingBag size={18} />

                    افزودن
                  </span>
                </motion.button>

                <motion.button
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center

                    rounded-2xl

                    border
                    border-gray-200

                    text-gray-500

                    transition

                    hover:border-red-200
                    hover:bg-red-50
                    hover:text-red-500
                  "
                >
                  <Trash2 size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}

      <div className="mt-8 rounded-3xl bg-pink-50 p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              ❤️ {wishlist.length} محصول در لیست علاقه‌مندی شما وجود دارد.
            </h3>

            <p className="mt-2 leading-8 text-gray-600">
              قبل از اتمام موجودی، محصولات مورد علاقه خود را به سبد
              خرید اضافه کنید.
            </p>
          </div>

          <Link
            href="/products"
            className="
              rounded-2xl

              bg-white

              px-6
              py-3

              font-semibold

              text-pink-600

              shadow-sm

              transition

              hover:-translate-y-1
            "
          >
            ادامه خرید
          </Link>
        </div>
      </div>
    </section>
  );
}