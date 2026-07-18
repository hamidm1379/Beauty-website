"use client";

import Image from "next/image";
import { Award, HeartHandshake, ShieldCheck } from "lucide-react";

export default function OurStory() {
  return (
    <section className="grid items-center gap-16 lg:grid-cols-2">
      {/* Image */}

      <div className="group relative">
        {/* Blur */}

        <div
          className="
            absolute
            -left-10
            -top-10

            h-40
            w-40

            rounded-full

            bg-pink-200/40

            blur-3xl
          "
        />

        <div
          className="
            overflow-hidden

            rounded-[36px]

            border
            border-gray-100

            bg-white

            shadow-xl
          "
        >
          <Image
            src="/apout1.png"
            alt="Our Story"
            width={700}
            height={800}
            className="
              h-full
              w-full

              object-cover

              transition-transform
              duration-700

              group-hover:scale-105
            "
          />
        </div>

        {/* Floating Card */}

      </div>

      {/* Content */}

      <div>
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
          داستان ما
        </span>

        <h2
          className="
            mt-6

            text-4xl
            font-black

            leading-tight

            text-gray-900
          "
        >
          ما فقط محصولات آرایشی
          <br />
          نمی‌فروشیم...
        </h2>

        <p
          className="
            mt-8

            leading-9

            text-gray-600
          "
        >
          زیبارو با هدف ایجاد تجربه‌ای متفاوت از خرید آنلاین محصولات
          آرایشی و مراقبتی تأسیس شد. ما معتقدیم زیبایی زمانی معنا پیدا
          می‌کند که همراه با کیفیت، اصالت و اعتماد باشد.

          <br />
          <br />

          به همین دلیل تمامی محصولات ما از برندهای معتبر جهانی تهیه
          شده و پیش از ارسال، از نظر اصالت و کیفیت بررسی می‌شوند تا
          با خیالی آسوده خرید کنید.
        </p>

        {/* Features */}

        <div className="mt-10 grid gap-5">
          {[
            {
              icon: ShieldCheck,
              title: "تضمین اصالت کالا",
              desc: "تمامی محصولات با ضمانت اصالت عرضه می‌شوند.",
            },
            {
              icon: Award,
              title: "برندهای معتبر جهانی",
              desc: "همکاری با بهترین برندهای آرایشی دنیا.",
            },
            {
              icon: HeartHandshake,
              title: "اعتماد مشتریان",
              desc: "بیش از هزاران مشتری وفادار همراه ما هستند.",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  group

                  flex
                  items-start
                  gap-5

                  rounded-3xl

                  border
                  border-gray-100

                  bg-white

                  p-5

                  shadow-sm

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                <div
                  className="
                    flex

                    h-14
                    w-14

                    items-center
                    justify-center

                    rounded-2xl

                    bg-pink-50

                    text-pink-500

                    transition-all

                    group-hover:rotate-6
                    group-hover:scale-110
                  "
                >
                  <Icon size={26} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 leading-7 text-gray-500">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}