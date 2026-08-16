"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import ProductCard, {
  Product,
} from "@/app/features/home/components/ProductCard";

interface Props {
  products: Product[];
}

export default function RelatedProducts({
  products,
}: Props) {
  if (!products.length) {
    return null;
  }

  return (
    <section
      className="
        mt-8
        rounded-2xl
        border
        border-gray-100
        bg-white
        p-4
        shadow-sm
        sm:mt-12
        sm:rounded-3xl
        sm:p-6
      "
    >
      {/* Header */}

      <div className="mb-5 flex items-center justify-between gap-3 sm:mb-8">
        <div>
          <h2 className="text-lg font-bold sm:text-2xl">
            محصولات مرتبط
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:text-base">
            پیشنهادهایی که شاید دوست داشته باشید
          </p>
        </div>

        <div className="flex shrink-0 gap-2 sm:gap-3">
          <button
            className="
              related-prev
              flex
              h-9
              w-9
              cursor-pointer
              items-center
              justify-center
              rounded-full
              border
              border-gray-200
              transition
              hover:border-pink-500
              hover:bg-pink-500
              hover:text-white
              sm:h-11
              sm:w-11
            "
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <button
            className="
              related-next
              flex
              h-9
              w-9
              cursor-pointer
              items-center
              justify-center
              rounded-full
              border
              border-gray-200
              transition
              hover:border-pink-500
              hover:bg-pink-500
              hover:text-white
              sm:h-11
              sm:w-11
            "
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>

      {/* Slider */}

      <Swiper
        modules={[Navigation]}
        className="h-auto!"
        spaceBetween={12}
        navigation={{
          prevEl: ".related-prev",
          nextEl: ".related-next",
        }}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}  className="h-auto!">
            <ProductCard
              product={product}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}