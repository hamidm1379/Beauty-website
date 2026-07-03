"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Wallet,
  Award,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    title: "کل سفارش‌ها",
    value: "12",
    subtitle: "+3 این ماه",
    icon: ShoppingBag,
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-50",
    iconColor: "text-pink-500",
  },
  {
    title: "علاقه‌مندی‌ها",
    value: "31",
    subtitle: "محصول ذخیره شده",
    icon: Heart,
    color: "from-red-500 to-pink-500",
    bg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    title: "کیف پول",
    value: "1.850.000",
    subtitle: "تومان",
    icon: Wallet,
    color: "from-emerald-500 to-green-500",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    title: "امتیاز باشگاه",
    value: "2850",
    subtitle: "VIP Member",
    icon: Award,
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
];

export default function AccountStats() {
  return (
    <section>
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <span className="rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-600">
            آمار حساب
          </span>

          <h2 className="mt-4 text-3xl font-black text-gray-900">
            نمای کلی فعالیت شما
          </h2>
        </div>

        <div className="hidden items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-emerald-600 lg:flex">
          <TrendingUp size={20} />

          <span className="font-semibold">
            رشد ۲۴٪ نسبت به ماه قبل
          </span>
        </div>
      </div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="
                group
                relative
                overflow-hidden

                rounded-[30px]

                border
                border-gray-100

                bg-white

                p-6

                shadow-sm

                transition-all

                hover:border-pink-200
                hover:shadow-xl
              "
            >
              {/* Glow */}

              <div
                className={`
                  absolute
                  -right-10
                  -top-10

                  h-28
                  w-28

                  rounded-full

                  ${item.bg}

                  blur-3xl
                `}
              />

              <div className="relative">
                {/* Top */}

                <div className="flex items-start justify-between">
                  <div
                    className={`
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center

                      rounded-3xl

                      ${item.bg}
                      ${item.iconColor}

                      transition-all

                      group-hover:rotate-6
                      group-hover:scale-110
                    `}
                  >
                    <Icon size={30} />
                  </div>

                  <div
                    className="
                      rounded-xl

                      bg-gray-50

                      p-2

                      transition

                      group-hover:bg-pink-50
                    "
                  >
                    <ArrowUpRight
                      size={18}
                      className="text-gray-400 group-hover:text-pink-500"
                    />
                  </div>
                </div>

                {/* Number */}

                <h3 className="mt-8 text-4xl font-black text-gray-900">
                  {item.value}
                </h3>

                {/* Title */}

                <p className="mt-3 font-bold text-gray-700">
                  {item.title}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {item.subtitle}
                </p>

                {/* Progress */}

                <div className="mt-6 h-2 overflow-hidden rounded-full bg-gray-100">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: "75%",
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.3 + index * 0.1,
                    }}
                    className={`h-full rounded-full bg-linear-to-r ${item.color}`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Banner */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          delay: 0.4,
        }}
        className="
          mt-8

          overflow-hidden

          rounded-[30px]

          bg-linear-to-r
          from-pink-500
          via-rose-500
          to-fuchsia-600

          p-8

          text-white
        "
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-2xl font-black">
              فقط ۱۵۰ امتیاز تا ارتقاء به Diamond 💎
            </h3>

            <p className="mt-3 max-w-2xl leading-8 text-pink-100">
              با خرید بعدی خود علاوه بر دریافت امتیاز بیشتر،
              از ارسال رایگان، تخفیف‌های اختصاصی و دسترسی
              زودهنگام به محصولات جدید بهره‌مند شوید.
            </p>
          </div>

          <button
            className="
              rounded-2xl

              bg-white

              px-8
              py-4

              font-bold

              text-pink-600

              transition

              hover:-translate-y-1
            "
          >
            مشاهده مزایا
          </button>
        </div>
      </motion.div>
    </section>
  );
}