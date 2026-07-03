"use client";

import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import HeroSlide from "./HeroSlide";
import { slides } from "./hero-data";

export default function HeroSlider() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 5000,
          }}
          loop
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <HeroSlide {...slide} />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}