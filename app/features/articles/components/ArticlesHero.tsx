"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  BookOpen,
  Sparkles,
  Heart,
  Clock3,
} from "lucide-react";

const floatingCards = [
  {
    title: "۵ سرم معجزه‌آسا برای روشن شدن پوست",
    time: "۶ دقیقه مطالعه",
    image: "/arti.png",
    position: "top-2 right-0 lg:top-6 lg:-right-4 lg:right-2",
    delay: 0.7,
  },
  {
    title: "ترفندهای آرایش ملایم و روزانه",
    time: "۶ دقیقه مطالعه",
    image: "/arti.png",
    position: "top-[42%] -left-2 lg:-left-6 lg:left-0",
    delay: 0.85,
  },
  {
    title: "راهنمای انتخاب مرطوب‌کننده مناسب",
    time: "۱۰ دقیقه مطالعه",
    image: "/arti.png",
    position: "bottom-2 right-0 lg:bottom-6 lg:-right-2 lg:right-6",
    delay: 1,
  },
];

export default function ArticlesHero() {
  return (
    <section className="relative overflow-hidden bg-[#FCF7F6] px-4 py-6 sm:px-6 sm:py-16 lg:px-12 lg:py-20 pb-0">
      <div className="mx-auto grid max-w-7xl items-center gap-6 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        {/* ---------------- Left column ---------------- */}
        <div className="text-right">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-5 py-2 text-xs font-semibold text-pink-600 sm:text-sm"
          >
            <BookOpen size={16} />
            مجله تخصصی زیبایی
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mt-6 text-3xl font-black leading-[1.3] text-slate-900 sm:mt-8 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            زیبایی را بشناس،
            <br />
            <span className="relative inline-block text-pink-600">
              بهترین خودت باش
              <svg
                className="absolute -bottom-2 right-0 w-full"
                height="10"
                viewBox="0 0 220 10"
                fill="none"
              >
                <path
                  d="M2 8C40 2 100 2 218 8"
                  stroke="#F472B6"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mx-auto mt-6 max-w-xl text-sm leading-8 text-slate-500 max-sm:text-justify sm:mt-8 sm:text-lg sm:leading-9 lg:mx-0"
          >
            دنیایی از مقالات تخصصی در زمینه مراقبت پوست و مو، آرایش، سبک
            زندگی و معرفی بهترین محصولات زیبایی را در مجله ما مطالعه کنید.
          </motion.p>
        </div>

        {/* ---------------- Right column (visual) ---------------- */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative mx-auto hidden h-115 w-full max-w-sm sm:block md:h-130 md:max-w-md lg:h-140 lg:max-w-none"
          >
            {/* Blob backgrounds */}
            <div className="absolute -top-4 right-4 h-28 w-28 rounded-full bg-linear-to-br from-violet-300/60 to-purple-200/40 blur-2xl sm:-top-6 sm:h-56 sm:w-56 lg:h-72 lg:w-72" />
            <div className="absolute bottom-0 left-2 h-32 w-32 rounded-full bg-linear-to-tr from-pink-300/60 to-rose-200/40 blur-2xl sm:h-64 sm:w-64 lg:h-80 lg:w-80" />

            {/* Portrait */}
            <div className="absolute inset-x-6 top-2 bottom-2 overflow-hidden rounded-[48%_48%_44%_44%/56%_56%_44%_44%] sm:inset-x-8 sm:top-4 sm:bottom-4 lg:inset-x-6">
              <Image
                src="/arti.png"
                alt="مدل زیبایی با پوست سالم"
                fill
                sizes="(max-width: 640px) 0px, (max-width: 1024px) 320px, 400px"
                className="object-cover"
                priority
              />
            </div>

            {/* Sparkle badge */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute left-0 top-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-lg sm:left-2 sm:top-6 sm:h-14 sm:w-14 sm:rounded-2xl"
            >
              <Sparkles size={18} className="text-pink-500 sm:hidden" />
              <Sparkles size={26} className="hidden text-pink-500 sm:block" />
            </motion.div>

            {/* Heart badge */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute right-0 top-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-slate-100 bg-white shadow-lg sm:h-14 sm:w-14"
            >
              <Heart size={16} className="text-pink-400 sm:hidden" />
              <Heart size={22} className="hidden text-pink-400 sm:block" />
            </motion.div>

            {/* Book badge (center bottom, overlapping portrait) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity }}
              className="absolute bottom-4 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-linear-to-br from-pink-500 to-rose-500 shadow-xl sm:bottom-10 sm:h-16 sm:w-16"
            >
              <BookOpen size={18} className="text-white sm:hidden" />
              <BookOpen size={26} className="hidden text-white sm:block" />
            </motion.div>

            {/* Floating article cards — sm and up, overlapping the visual */}
            {floatingCards.map((card) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: card.delay, duration: 0.6 }}
                className={`absolute ${card.position} hidden w-44 items-center gap-2 rounded-xl border border-slate-100 bg-white/95 p-2 shadow-xl backdrop-blur sm:flex sm:w-48 sm:gap-3 sm:rounded-2xl sm:p-3 lg:w-56`}
              >
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg sm:h-14 sm:w-14 sm:rounded-xl">
                  <Image src={card.image} alt={card.title} fill sizes="56px" className="object-cover" />
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold leading-5 text-slate-800 sm:text-sm sm:leading-6">
                    {card.title}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1 text-[10px] text-slate-400 sm:text-xs">
                    <Clock3 size={12} />
                    {card.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Article cards — mobile only, stacked as a clean list below the image */}
          <div className="hidden mt-2 w-full flex-col gap-3 sm:hidden">
            {floatingCards.map((card) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: card.delay, duration: 0.5 }}
                className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-md"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                  <Image src={card.image} alt={card.title} fill sizes="56px" className="object-cover" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold leading-6 text-slate-800">
                    {card.title}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs text-slate-400">
                    <Clock3 size={12} />
                    {card.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}