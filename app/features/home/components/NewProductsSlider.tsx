"use client";

import ProductCard, { Product } from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

import "swiper/css";

interface Props {
  products: Product[];
}

export default function NewProductsSlider({
  products,
}: Props) {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 bg-gray-100 py-6 md:py-10 md:rounded-t-3xl">

      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
          جدیدترین محصولات
        </h2>

        <Link
          href="/products"
          className="text-pink-500 text-[12px] sm:text-sm md:text-md"
        >
          مشاهده همه
        </Link>
      </div>

      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
}