"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";

import ProductCard, {
  Product,
} from "@/app/features/home/components/ProductCard";

const products: Product[] = Array.from({ length: 8 }, (_, index) => ({
  id: String(index + 1),

  slug: `product-${index + 1}`,

  title: "کرم آبرسان لورآل",

  brand: "L'Oréal",

  image: "/hero3.png",

  price: 890000,

  oldPrice: 1090000,

  discount: 18,
}));

export default function RelatedProducts() {
  return (
    <section
      className="
        mt-12

        rounded-3xl

        border
        border-gray-100

        bg-white

        p-6

        shadow-sm
      "
    >
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            محصولات مرتبط
          </h2>

          <p className="mt-1 text-gray-500">
            پیشنهادهایی که شاید دوست داشته باشید
          </p>
        </div>

        <div className="flex gap-3">
          <button
            className="
              related-prev

              flex
              h-11
              w-11

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
            "
          >
            <ChevronRight size={20} />
          </button>

          <button
            className="
              related-next

              flex
              h-11
              w-11

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
            "
          >
            <ChevronLeft size={20} />
          </button>
        </div>
      </div>

      {/* Slider */}

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        navigation={{
          prevEl: ".related-prev",
          nextEl: ".related-next",
        }}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
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