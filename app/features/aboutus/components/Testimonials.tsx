"use client";

import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "سارا محمدی",
    role: "مشتری وفادار",
    image: "/hero2.png",
    rate: 5,
    comment:
      "کیفیت محصولات فوق‌العاده بود. بسته‌بندی بسیار شیک و ارسال هم سریع انجام شد. قطعاً دوباره خرید می‌کنم.",
  },
  {
    name: "الهام رضایی",
    role: "خریدار",
    image: "/hero2.png",
    rate: 5,
    comment:
      "از اصالت محصولات خیالم کاملاً راحت بود. تجربه خرید بسیار حرفه‌ای و پشتیبانی عالی داشتند.",
  },
  {
    name: "مریم حسینی",
    role: "Beauty Blogger",
    image: "/hero2.png",
    rate: 5,
    comment:
      "تنوع برندها واقعاً عالیه. چند محصول لوکس سفارش دادم و دقیقاً همون چیزی بود که انتظار داشتم.",
  },
];

export default function Testimonials() {
  return (
    <section>
      {/* Header */}

      <div className="mx-auto max-w-3xl text-center">
        <span
          className="
            inline-flex
            rounded-full
            bg-pink-50
            px-4
            py-2
            text-sm
            font-semibold
            text-pink-600
          "
        >
          نظرات مشتریان
        </span>

        <h2
          className="
            mt-5
            text-4xl
            font-black
            text-gray-900
          "
        >
          مشتریان درباره ما چه می‌گویند؟
        </h2>

        <p
          className="
            mt-6
            leading-8
            text-gray-500
          "
        >
          رضایت مشتریان مهم‌ترین دلیل ادامه مسیر ماست.
        </p>
      </div>

      {/* Cards */}

      <div
        className="
          mt-16

          grid

          gap-8

          lg:grid-cols-3
        "
      >
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="
              group

              relative

              overflow-hidden

              rounded-4xl

              border
              border-gray-100

              bg-white

              p-8

              shadow-sm

              transition-all
              duration-500

              hover:-translate-y-2
              hover:border-pink-200
              hover:shadow-2xl
            "
          >
            {/* Glow */}

            <div
              className="
                absolute
                -left-10
                -top-10

                h-36
                w-36

                rounded-full

                bg-pink-100/50

                blur-3xl

                transition

                group-hover:scale-150
              "
            />

            {/* Quote */}

            <span
              className="
                absolute

                left-6
                top-5

                text-7xl

                font-black

                text-pink-100
              "
            >
              ”
            </span>

            {/* User */}

            <div className="relative flex items-center gap-4">
              <div
                className="
                  relative

                  h-16
                  w-16

                  overflow-hidden

                  rounded-full

                  ring-4
                  ring-pink-100
                "
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.role}
                </p>
              </div>
            </div>

            {/* Rating */}

            <div className="mt-6 flex gap-1">
              {Array.from({ length: item.rate }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            {/* Comment */}

            <p
              className="
                mt-6

                leading-8

                text-gray-600
              "
            >
              {item.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom */}

      <div
        className="
          mt-14

          rounded-4xl

          bg-linear-to-r
          from-pink-500
          to-fuchsia-500

          px-8
          py-12

          text-center

          text-white

          shadow-xl
        "
      >
        <h3 className="text-3xl font-black">
          بیش از ۱۲ هزار مشتری به ما اعتماد کرده‌اند
        </h3>

        <p className="mx-auto mt-4 max-w-3xl leading-8 text-pink-100">
          هدف ما ارائه بهترین محصولات آرایشی اورجینال با ارسال سریع،
          پشتیبانی حرفه‌ای و تجربه خریدی متفاوت برای تمام مشتریان است.
        </p>
      </div>
    </section>
  );
}