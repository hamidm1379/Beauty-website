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
    image:"/arti.png",
    position: "top-6 -right-4 lg:right-2",
    delay: 0.7,
  },
  {
    title: "ترفندهای آرایش ملایم و روزانه",
    time: "۶ دقیقه مطالعه",
    image: "/arti.png",
    position: "top-[42%] -left-6 lg:left-0",
    delay: 0.85,
  },
  {
    title: "راهنمای انتخاب مرطوب‌کننده مناسب",
    time: "۱۰ دقیقه مطالعه",
    image: "/arti.png",
    position: "bottom-6 -right-2 lg:right-6",
    delay: 1,
  },
];

export default function ArticlesHero() {
  return (
    <section className="relative overflow-hidden bg-[#FCF7F6] px-6 py-16 lg:px-12 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* ---------------- Left column ---------------- */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-600"
          >
            <BookOpen size={16} />
            مجله تخصصی زیبایی
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mt-8 text-5xl font-black leading-[1.3] text-slate-900 lg:text-6xl"
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
            className="mt-8 max-w-xl text-lg leading-9 text-slate-500"
          >
            دنیایی از مقالات تخصصی در زمینه مراقبت پوست و مو، آرایش، سبک
            زندگی و معرفی بهترین محصولات زیبایی را در مجله ما مطالعه کنید.
          </motion.p>

        </div>

        {/* ---------------- Right column (visual) ---------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative mx-auto h-140 w-full max-w-md lg:max-w-none"
        >
          {/* Blob backgrounds */}
          <div className="absolute -top-6 right-4 h-72 w-72 rounded-full bg-linear-to-br from-violet-300/60 to-purple-200/40 blur-2xl" />
          <div className="absolute bottom-0 left-2 h-80 w-80 rounded-full bg-linear-to-tr from-pink-300/60 to-rose-200/40 blur-2xl" />

          {/* Portrait */}
          <div className="absolute inset-x-6 top-4 bottom-4 overflow-hidden rounded-[48%_48%_44%_44%/56%_56%_44%_44%]">
            <Image
              src="/arti.png"
              alt="مدل زیبایی با پوست سالم"
              fill
              className="object-cover"
              priority
            
            />
          </div>

          {/* Sparkle badge */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute left-2 top-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg"
          >
            <Sparkles size={26} className="text-pink-500" />
          </motion.div>

          {/* Heart badge */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute right-0 top-1/2 flex h-14 w-14 items-center justify-center rounded-full border border-slate-100 bg-white shadow-lg"
          >
            <Heart size={22} className="text-pink-400" />
          </motion.div>

          {/* Book badge (center bottom, overlapping portrait) */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-linear-to-br from-pink-500 to-rose-500 shadow-xl"
          >
            <BookOpen size={26} className="text-white" />
          </motion.div>

          {/* Floating article cards */}
          {floatingCards.map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: card.delay, duration: 0.6 }}
              className={`absolute ${card.position} flex w-56 items-center gap-3 rounded-2xl border border-slate-100 bg-white/95 p-3 shadow-xl backdrop-blur`}
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                <Image src={card.image} alt={card.title} fill className="object-cover" />
              </div>
              <div className="text-right">
                <p className="text-sm font-bold leading-6 text-slate-800">{card.title}</p>
                <span className="mt-1 inline-flex items-center gap-1 text-xs text-slate-400">
                  <Clock3 size={12} />
                  {card.time}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    
    </section>
  );
}