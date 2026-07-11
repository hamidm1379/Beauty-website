"use client";

import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import HeroSlide from "./HeroSlide";

interface Props {
  banners: any[];
}

export default function HeroSliderClient({
  banners,
}: Props) {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={banners.length > 1}
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <HeroSlide
                title={banner.title}
                subtitle={banner.subtitle ?? ""}
                image={banner.image}
                buttonText={banner.buttonText ?? ""}
                link={banner.link ?? ""}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}