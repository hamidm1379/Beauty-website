"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Star,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

const products = [
  {
    id: 1,
    title: "کرم آبرسان صورت",
    brand: "La Roche-Posay",
    image: "/products/1.jpg",
    price: 890000,
    oldPrice: 1050000,
    rate: 4.9,
    badge: "پرفروش",
  },
  {
    id: 2,
    title: "سرم ویتامین C",
    brand: "The Ordinary",
    image: "/products/2.jpg",
    price: 1240000,
    oldPrice: 1450000,
    rate: 4.8,
    badge: "جدید",
  },
  {
    id: 3,
    title: "ضد آفتاب SPF50",
    brand: "Bioderma",
    image: "/products/3.jpg",
    price: 990000,
    oldPrice: 1190000,
    rate: 4.7,
    badge: "محبوب",
  },
  {
    id: 4,
    title: "ژل شستشوی صورت",
    brand: "CeraVe",
    image: "/products/4.jpg",
    price: 760000,
    oldPrice: 910000,
    rate: 4.9,
    badge: "ویژه",
  },
];

export default function RecommendedProducts() {
  return (
    <section className="relative overflow-hidden rounded-[36px] border border-gray-100 bg-white p-8 shadow-sm">
      {/* Background */}

      <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-pink-100 blur-3xl" />

      <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-rose-100 blur-3xl" />

      <div className="relative">
        {/* Header */}

        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-600">
              <Sparkles size={16} />
              پیشنهاد اختصاصی
            </span>

            <h2 className="mt-5 text-3xl font-black text-gray-900">
              شاید این محصولات را هم دوست داشته باشید
            </h2>

            <p className="mt-3 max-w-2xl leading-8 text-gray-500">
              براساس سبد خرید شما، این محصولات می‌توانند
              انتخاب مناسبی برای تکمیل روتین مراقبت پوست
              و زیبایی باشند.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-2xl bg-pink-500 px-6 py-3 font-semibold text-white transition hover:bg-pink-600"
          >
            مشاهده همه

            <ArrowLeft size={18} />
          </Link>
        </div>

        {/* Products */}

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{
                opacity: 0,
                y: 40,
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
                y: -10,
              }}
              className="group overflow-hidden rounded-[30px] border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-pink-200 hover:shadow-xl"
            >
              {/* Image */}

              <div className="relative overflow-hidden bg-gray-50">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="aspect-square w-full object-cover transition duration-500 group-hover:scale-110"
                />

                {/* Badge */}

                <span className="absolute right-4 top-4 rounded-full bg-pink-500 px-3 py-1 text-xs font-bold text-white shadow">
                  {product.badge}
                </span>

                {/* Wishlist */}

                <button
                  className="
                    absolute
                    left-4
                    top-4

                    flex
                    h-10
                    w-10
                    items-center
                    justify-center

                    rounded-full

                    bg-white/90

                    text-gray-500

                    backdrop-blur

                    transition

                    hover:text-pink-500
                  "
                >
                  <Heart size={18} />
                </button>
              </div>

              {/* Content */}

              <div className="p-5">
                <span className="text-sm text-pink-500">
                  {product.brand}
                </span>

                <h3 className="mt-2 line-clamp-2 h-14 font-bold leading-7 text-gray-900">
                  {product.title}
                </h3>

                <div className="mt-4 flex items-center gap-1">
                  <Star
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="text-sm font-semibold">
                    {product.rate}
                  </span>
                </div>

                {/* Price */}

                <div className="mt-5">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-black text-pink-600">
                      {product.price.toLocaleString("fa-IR")}
                    </span>

                    <span className="text-sm text-gray-400 line-through">
                      {product.oldPrice.toLocaleString("fa-IR")}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-gray-500">
                    تومان
                  </p>
                </div>

                {/* Button */}

                <motion.button
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="
                    mt-6

                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2

                    rounded-2xl

                    bg-linear-to-r
                    from-pink-500
                    to-rose-500

                    px-5
                    py-3

                    font-semibold

                    text-white

                    transition

                    hover:shadow-lg
                    hover:shadow-pink-200
                  "
                >
                  <ShoppingBag size={18} />

                  افزودن به سبد خرید
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}