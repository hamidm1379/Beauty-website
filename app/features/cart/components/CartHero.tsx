"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Truck, ShieldCheck, CreditCard } from "lucide-react";

const features = [
  {
    icon: ShoppingBag,
    title: "بررسی سبد",
    desc: "محصولات انتخابی را بررسی کنید",
  },
  {
    icon: Truck,
    title: "ارسال سریع",
    desc: "ارسال به سراسر کشور",
  },
  {
    icon: ShieldCheck,
    title: "اصالت کالا",
    desc: "تضمین اصالت تمامی محصولات",
  },
  {
    icon: CreditCard,
    title: "پرداخت مطمئن",
    desc: "پرداخت امن و رمزنگاری‌شده",
  },
];

export default function CartHero() {
  return (
    <section className="relative overflow-hidden rounded-4xl border border-gray-100 bg-white px-8 py-7 shadow-sm">
      {/* Background */}

      <div className="absolute -left-20 -top-20 h-52 w-52 rounded-full bg-pink-100 blur-3xl" />

      <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-rose-100 blur-3xl" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Content */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <span
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              bg-pink-50

              px-4
              py-2

              text-sm
              font-semibold

              text-pink-600
            "
          >
            <ShoppingBag size={16} />

            مرحله اول
          </span>

          <h1
            className="
              mt-4

              text-3xl
              font-black

              text-gray-900

              lg:text-4xl
            "
          >
            سبد خرید شما
          </h1>

          <p
            className="
              mt-3

              max-w-2xl

              leading-8

              text-gray-500
            "
          >
            محصولات انتخاب شده را بررسی کنید و برای ادامه‌ی فرآیند خرید
            و ثبت سفارش، وارد مرحله بعد شوید.
          </p>
        </motion.div>

        {/* Features */}

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                }}
                className="
                  group

                  rounded-2xl

                  border
                  border-gray-100

                  bg-gray-50

                  p-4

                  transition-all

                  hover:border-pink-200
                  hover:bg-white
                  hover:shadow-lg
                "
              >
                <div
                  className="
                    flex

                    h-11
                    w-11

                    items-center
                    justify-center

                    rounded-xl

                    bg-pink-100

                    text-pink-500

                    transition

                    group-hover:rotate-6
                    group-hover:scale-110
                  "
                >
                  <Icon size={20} />
                </div>

                <h3 className="mt-3 font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs leading-6 text-gray-500">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}