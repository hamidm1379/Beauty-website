"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="relative overflow-hidden rounded-[40px]">
      {/* Background */}

      <div
        className="
          absolute
          inset-0

          bg-linear-to-br
          from-pink-500
          via-rose-500
          to-fuchsia-600
        "
      />

      {/* Glow */}

      <div
        className="
          absolute
          -left-24
          -top-24

          h-80
          w-80

          rounded-full

          bg-white/15

          blur-3xl
        "
      />

      <div
        className="
          absolute
          -bottom-24
          -right-24

          h-96
          w-96

          rounded-full

          bg-white/10

          blur-3xl
        "
      />

      {/* Decorative */}

      <div
        className="
          absolute

          left-20
          top-16

          h-24
          w-24

          rounded-full

          border
          border-white/20
        "
      />

      <div
        className="
          absolute

          bottom-12
          right-20

          h-16
          w-16

          rounded-full

          border
          border-white/20
        "
      />

      {/* Content */}

      <div
        className="
          relative

          mx-auto

          max-w-5xl

          px-8
          py-24

          text-center

          text-white
        "
      >
        <span
          className="
            inline-flex

            rounded-full

            bg-white/15

            px-5
            py-2

            text-sm
            font-semibold

            backdrop-blur-md
          "
        >
          Beauty Starts Here ✨
        </span>

        <h2
          className="
            mt-8

            text-4xl
            font-black

            leading-tight

            md:text-6xl
          "
        >
          زیبایی را
          <br />
          با اطمینان تجربه کنید
        </h2>

        <p
          className="
            mx-auto

            mt-8

            max-w-3xl

            text-lg

            leading-9

            text-pink-100
          "
        >
          هزاران محصول آرایشی و مراقبتی اورجینال، ارسال سریع،
          ضمانت اصالت کالا و پشتیبانی حرفه‌ای، تنها بخشی از
          تجربه‌ای است که در زیبارو منتظر شماست.
        </p>

        {/* Buttons */}

        <div
          className="
            mt-12

            flex

            flex-col
            justify-center

            gap-5

            sm:flex-row
          "
        >
          {/* Shop */}

          <Link
            href="/products"
            className="
              group

              inline-flex

              items-center
              justify-center

              gap-3

              rounded-2xl

              bg-white

              px-8
              py-4

              text-lg
              font-bold

              text-pink-600

              transition-all
              duration-300

              hover:-translate-y-1
              hover:shadow-2xl
            "
          >
            <ShoppingBag
              size={22}
              className="transition group-hover:rotate-12"
            />

            مشاهده محصولات

            <ArrowLeft
              size={20}
              className="
                transition
                group-hover:-translate-x-1
              "
            />
          </Link>

          {/* Contact */}

          <Link
            href="/contact"
            className="
              inline-flex

              items-center
              justify-center

              rounded-2xl

              border
              border-white/30

              bg-white/10

              px-8
              py-4

              text-lg
              font-semibold

              backdrop-blur-md

              transition-all
              duration-300

              hover:bg-white/20
              hover:-translate-y-1
            "
          >
            ارتباط با ما
          </Link>
        </div>

        {/* Stats */}

        <div
          className="
            mt-20

            grid

            gap-8

            border-t
            border-white/20

            pt-10

            sm:grid-cols-3
          "
        >
          <div>
            <h3 className="text-4xl font-black">
              +12K
            </h3>

            <p className="mt-2 text-pink-100">
              مشتری وفادار
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-black">
              +350
            </h3>

            <p className="mt-2 text-pink-100">
              برند معتبر
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-black">
              99%
            </h3>

            <p className="mt-2 text-pink-100">
              رضایت مشتریان
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}