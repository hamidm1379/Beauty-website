"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Crown,
  Sparkles,
  ShoppingBag,
  Heart,
  Award,
  ArrowLeft,
} from "lucide-react";

export default function AccountHero() {
  return (
    <section className="relative overflow-hidden rounded-[36px] bg-linear-to-br from-pink-500 via-rose-500 to-fuchsia-600 p-8 text-white shadow-2xl lg:p-10">
      {/* Background */}

      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

      {/* Floating */}

      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="
          absolute
          left-10
          top-10

          hidden

          h-18
          w-18

          items-center
          justify-center

          rounded-3xl

          bg-white/10

          backdrop-blur

          lg:flex
        "
      >
        <Sparkles size={34} />
      </motion.div>

      <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_320px]">
        {/* Left */}

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: .6,
          }}
        >
          <span
            className="
              inline-flex

              items-center
              gap-2

              rounded-full

              bg-white/15

              px-4
              py-2

              text-sm
              font-semibold

              backdrop-blur
            "
          >
            <Crown size={16} />

            پنل کاربری
          </span>

          <h1 className="mt-6 text-5xl font-black leading-tight">
            سلام محمد 👋
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-9 text-pink-100">
            خوشحالیم که دوباره اینجایی.
            <br />
            تمام سفارش‌ها، علاقه‌مندی‌ها و اطلاعات حساب کاربری
            خودت رو از اینجا مدیریت کن.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              className="
                rounded-2xl

                bg-white

                px-7
                py-4

                font-bold

                text-pink-600

                transition

                hover:-translate-y-1
              "
            >
              مشاهده سفارش‌ها
            </button>

            <button
              className="
                flex
                items-center
                gap-2

                rounded-2xl

                border
                border-white/20

                bg-white/10

                px-7
                py-4

                font-semibold

                backdrop-blur

                transition

                hover:bg-white/20
              "
            >
              ویرایش پروفایل

              <ArrowLeft size={18} />
            </button>
          </div>

          {/* Stats */}

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: ShoppingBag,
                number: "12",
                title: "سفارش",
              },
              {
                icon: Heart,
                number: "31",
                title: "علاقه‌مندی",
              },
              {
                icon: Award,
                number: "2850",
                title: "امتیاز",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  whileHover={{
                    y: -5,
                  }}
                  key={item.title}
                  className="
                    rounded-3xl

                    border
                    border-white/15

                    bg-white/10

                    p-5

                    backdrop-blur
                  "
                >
                  <div className="flex items-center justify-between">
                    <Icon size={26} />

                    <span className="text-3xl font-black">
                      {item.number}
                    </span>
                  </div>

                  <p className="mt-4 text-pink-100">
                    {item.title}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right */}

        <motion.div
          initial={{
            opacity: 0,
            scale: .9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: .2,
          }}
          className="relative flex justify-center"
        >
          {/* Glow */}

          <div className="absolute h-72 w-72 rounded-full bg-white/15 blur-3xl" />

          {/* Avatar */}

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
            }}
            className="relative"
          >
            <div
              className="
                overflow-hidden

                rounded-full

                border-[6px]
                border-white/20

                bg-white

                shadow-2xl
              "
            >
              <Image
                src="/avatar.jpg"
                alt="User"
                width={260}
                height={260}
                className="h-64 w-64 object-cover"
              />
            </div>

            {/* VIP */}

            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="
                absolute
                -bottom-3
                left-1/2

                flex
                -translate-x-1/2

                items-center
                gap-2

                rounded-full

                bg-white

                px-5
                py-3

                shadow-xl
              "
            >
              <Crown
                size={18}
                className="text-yellow-500"
              />

              <span className="font-bold text-gray-800">
                عضو طلایی
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}