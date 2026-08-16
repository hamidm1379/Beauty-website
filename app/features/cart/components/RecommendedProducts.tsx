"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

import ProductCard, {
  Product,
} from "@/app/features/home/components/ProductCard";

import "swiper/css";

interface Props {
  products: Product[];
}

export default function RecommendedProducts({ products }: Props) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section>
      {/* Header */}

      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="rounded-full bg-pink-100 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-semibold text-pink-600">
            پیشنهاد ویژه
          </span>

          <h2 className="mt-3 text-xl sm:mt-4 sm:text-3xl lg:text-4xl font-black text-gray-900">
            شاید این محصولات را هم دوست داشته باشید
          </h2>

          <p className="mt-2 text-sm sm:mt-3 sm:text-base text-gray-500">
            بر اساس محصولات موجود در سبد خرید شما
          </p>
        </div>

        <Link
          href="/products"
          className="
            hidden
            rounded-2xl
            border
            border-pink-200
            px-6
            py-3
            font-semibold
            text-pink-600
            transition
            hover:bg-pink-500
            hover:text-white
            lg:block
          "
        >
          مشاهده همه
        </Link>
      </div>

      {/* Products */}

      <Swiper
        className="h-auto!"
        slidesPerView={4}
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 12 },
          768: { slidesPerView: 3, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="h-auto!">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Mobile Button */}

      <div className="mt-6 sm:mt-8 lg:hidden">
        <Link
          href="/products"
          className="flex h-11 sm:h-12 items-center justify-center rounded-xl sm:rounded-2xl border border-pink-300 text-sm sm:text-base font-semibold text-pink-600 transition hover:bg-pink-500 hover:text-white"
        >
          مشاهده همه محصولات
        </Link>
      </div>
    </section>
  );
}