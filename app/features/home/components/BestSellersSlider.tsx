"use client";

import Link from "next/link";
import ProductCard from "../components/ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

type Props = {
  products: any[];
};

export default function BestSellersSlider({ products }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 bg-gray-100 py-10 rounded-b-3xl">

      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold">
          محبوب ترین محصولات
        </h2>

        <Link href="/products" className="text-pink-500">
          مشاهده همه
        </Link>
      </div>

      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
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