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
    <section className="relative overflow-hidden rounded-2xl sm:rounded-4xl border border-gray-100 bg-white px-4 py-5 sm:px-8 sm:py-7 shadow-sm">
      {/* Background */}

      <div className="absolute -left-20 -top-20 h-32 w-32 sm:h-52 sm:w-52 rounded-full bg-pink-100 blur-3xl" />

      <div className="absolute -right-20 -bottom-20 h-40 w-40 sm:h-64 sm:w-64 rounded-full bg-rose-100 blur-3xl" />

      <div className="relative flex flex-col gap-5 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
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
          <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-pink-50 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-pink-600">
            <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />

            مرحله اول
          </span>

          <h1 className="mt-3 sm:mt-4 text-xl sm:text-3xl font-black text-gray-900 lg:text-4xl">
            سبد خرید شما
          </h1>

          <p className="mt-2 sm:mt-3 max-w-2xl text-sm sm:text-base leading-6 sm:leading-8 text-gray-500">
            محصولات انتخاب شده را بررسی کنید و برای ادامه‌ی فرآیند خرید
            و ثبت سفارش، وارد مرحله بعد شوید.
          </p>
        </motion.div>

        {/* Features */}

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                }}
                className="group rounded-xl sm:rounded-2xl border border-gray-100 bg-gray-50 p-3 sm:p-4 transition-all hover:border-pink-200 hover:bg-white hover:shadow-lg"
              >
                <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-lg sm:rounded-xl bg-pink-100 text-pink-500 transition group-hover:rotate-6 group-hover:scale-110">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>

                <h3 className="mt-2 sm:mt-3 text-sm sm:text-base font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-1 text-[11px] sm:text-xs leading-5 sm:leading-6 text-gray-500">
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