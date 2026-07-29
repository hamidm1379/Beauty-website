"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Truck, Gem } from "lucide-react";

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "تضمین اصالت",
    desc: "تمام محصولات کاملاً اورجینال و دارای هولوگرام اصالت هستند.",
    bg: "bg-violet-100",
    color: "text-violet-500",
  },
  {
    icon: Truck,
    title: "ارسال سریع",
    desc: "ارسال سفارش به سراسر کشور، حداکثر ظرف ۴۸ ساعت.",
    bg: "bg-pink-100",
    color: "text-pink-500",
  },
  {
    icon: Gem,
    title: "برندهای معتبر",
    desc: "لورآل، استی لادر، سراوی و بیش از ۳۰ برند بین‌المللی دیگر.",
    bg: "bg-rose-100",
    color: "text-rose-500",
  },
];

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#FCF7F6] px-6 py-8 lg:py-24 lg:px-20">
      {/* Ambient glows, matching the site's signature look */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-linear-to-br from-violet-300/50 to-purple-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-linear-to-tr from-pink-300/50 to-rose-200/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-start gap-10 md:gap-20 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ---------------- Left: statement ---------------- */}
        <div className="relative">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-5 py-2 text-[12px] sm:text-sm font-semibold text-pink-600"
          >
            زیبارو، از سال ۲۰۲۱
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-8 text-3xl sm:text-4xl md:text-5xl font-black leading-[1.3] text-slate-900 lg:text-6xl"
          >
            زیبایی یعنی
            <br />
            <span className="relative inline-block text-pink-600">
              اعتماد به خودت
              <svg
                className="absolute -bottom-2 right-0 w-full"
                height="10"
                viewBox="0 0 260 10"
                fill="none"
              >
                <path
                  d="M2 8c40-6 180-6 256 2"
                  stroke="#F472B6"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          {/* Authenticity seal — signature element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="absolute -left-4 top-0 hidden lg:block"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="flex h-28 w-28 items-center justify-center rounded-full border border-dashed border-pink-300"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-pink-500 to-rose-500 text-center text-[11px] font-bold leading-4 text-white shadow-lg shadow-pink-200">
                ضمانت
                <br />
                اصالت ۱۰۰٪
              </div>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-8 max-w-xl max-sm:text-justify text-md sm:text-lg leading-8 sm:leading-9 text-slate-500"
          >
            ما در زیبارو تلاش می‌کنیم بهترین برندهای آرایشی و مراقبتی دنیا را
            با تضمین اصالت کالا، ارسال سریع و پشتیبانی حرفه‌ای در اختیار شما
            قرار دهیم تا تجربه‌ای متفاوت از خرید آنلاین داشته باشید.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-1 sm:gap-3 rounded-xl sm:rounded-2xl bg-linear-to-l from-pink-500 to-rose-500 px-4 py-2 sm:px-8 sm:py-4 sm:font-bold text-white shadow-lg shadow-pink-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              مشاهده محصولات
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 transition group-hover:-translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1 sm:gap-2 rounded-xl sm:rounded-2xl border border-slate-200 bg-white px-4 py-2 sm:px-8 sm:py-4 sm:font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-50"
            >
              تماس با ما
            </Link>
          </motion.div>
        </div>

        {/* ---------------- Right: trust list ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="divide-y divide-slate-100 rounded-3xl border border-slate-100 bg-white shadow-xl shadow-pink-100/40"
        >
          {trustPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group flex items-start gap-5 px-7 py-7 transition-colors hover:bg-pink-50/40"
              >
                <span
                  className={`mt-1 flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-2xl ${item.bg} ${item.color} transition-transform duration-300 group-hover:rotate-6`}
                >
                  <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                </span>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-md sm:text-lg font-bold text-slate-900">
                      {item.title}
                    </span>
                    <span className="text-[10px] sm:text-xs text-slate-300">0{index + 1}</span>
                  </div>
                  <p className="mt-1 sm:mt-2 leading-6 sm:leading-7 max-sm:text-[15px] text-slate-500">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}