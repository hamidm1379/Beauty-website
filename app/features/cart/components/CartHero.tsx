"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Truck, ShieldCheck, CreditCard } from "lucide-react";

const cards = [
  // {
  //   icon: ShoppingBag,
  //   value: "۳",
  //   title: "محصول",
  // },
  {
    icon: Truck,
    value: "ارسال",
    title: "سریع",
  },
  {
    icon: ShieldCheck,
    value: "۱۰۰٪",
    title: "اصالت",
  },
  {
    icon: CreditCard,
    value: "پرداخت",
    title: "مطمئن",
  },
];

export default function CartHero() {
  return (
    <section className="relative overflow-hidden rounded-4xl border border-gray-100 bg-white px-8 py-7 shadow-sm">
      {/* Glow */}

      <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-pink-100 blur-3xl" />
      <div className="absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-rose-100 blur-3xl" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-600">
            <ShoppingBag size={16} />
            سبد خرید
          </span>

          <h1 className="mt-4 text-3xl font-black text-gray-900 lg:text-4xl">
            سبد خرید شما
          </h1>

          <p className="mt-3 max-w-xl leading-8 text-gray-500">
            محصولات انتخاب شده را بررسی کنید و سفارش خود را نهایی نمایید.
          </p>
        </motion.div>

        {/* Right */}

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {cards.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                whileHover={{ y: -4 }}
                key={item.title}
                className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 transition hover:border-pink-200 hover:bg-white"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-500">
                  <Icon size={20} />
                </div>

                <div>
                  <p className="font-black text-gray-900">{item.value}</p>

                  <span className="text-xs text-gray-500">{item.title}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      {/* Progress */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.3,
        }}
        className="mt-8"
      >
        <div className="flex items-center">
          {[
            {
              title: "سبد خرید",
              active: true,
            },
            {
              title: "اطلاعات ارسال",
            },
            {
              title: "پرداخت",
            },
            {
              title: "تکمیل سفارش",
            },
          ].map((step, index, array) => (
            <div key={step.title} className="flex flex-1 items-center">
              {/* Circle */}

              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{
                    scale: 1.08,
                  }}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                    step.active
                      ? "border-pink-500 bg-pink-500 text-white shadow-lg shadow-pink-300/40"
                      : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {index + 1}
                </motion.div>

                <span
                  className={`mt-3 text-xs font-medium whitespace-nowrap ${
                    step.active ? "text-pink-600" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
              </div>

              {/* Line */}

              {index !== array.length - 1 && (
                <div className="mx-4 mb-7 h-0.75 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: step.active ? "100%" : "0%",
                    }}
                    transition={{
                      duration: 0.8,
                    }}
                    className="h-full rounded-full bg-linear-to-r from-pink-500 to-rose-500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
