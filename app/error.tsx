"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, RefreshCw, AlertTriangle, Star } from "lucide-react";

const bubbles = [
  { size: 46, top: "10%", left: "6%", duration: 7, delay: 0 },
  { size: 24, top: "24%", left: "18%", duration: 5.5, delay: 0.6 },
  { size: 64, top: "62%", left: "4%", duration: 8.5, delay: 1.2 },
  { size: 30, top: "82%", left: "14%", duration: 6, delay: 0.3 },
  { size: 50, top: "12%", left: "90%", duration: 7.5, delay: 0.9 },
  { size: 26, top: "42%", left: "95%", duration: 5, delay: 0.2 },
  { size: 56, top: "76%", left: "88%", duration: 9, delay: 1.5 },
  { size: 20, top: "92%", left: "78%", duration: 6.5, delay: 0.8 },
  { size: 34, top: "48%", left: "50%", duration: 8, delay: 1.8 },
  { size: 22, top: "5%", left: "42%", duration: 6.2, delay: 1.1 },
];

const stars = [
  { size: 16, top: "16%", left: "30%", duration: 2.2, delay: 0 },
  { size: 10, top: "36%", left: "10%", duration: 2.8, delay: 0.5 },
  { size: 14, top: "8%", left: "64%", duration: 2.4, delay: 1 },
  { size: 9, top: "52%", left: "24%", duration: 3, delay: 0.3 },
  { size: 18, top: "68%", left: "60%", duration: 2.6, delay: 1.4 },
  { size: 11, top: "28%", left: "82%", duration: 2.3, delay: 0.8 },
  { size: 13, top: "86%", left: "38%", duration: 2.9, delay: 0.2 },
];

function FloatingBubbles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bubbles.map((b, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background:
              "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 14%, rgba(244,114,182,0.35) 45%, rgba(236,72,153,0.18) 75%, rgba(236,72,153,0.06) 100%)",
            boxShadow:
              "inset -4px -4px 10px rgba(219,39,119,0.15), inset 3px 3px 6px rgba(255,255,255,0.8), 0 6px 16px rgba(236,72,153,0.15)",
            border: "1px solid rgba(255,255,255,0.6)",
          }}
          animate={{
            y: [0, -26, 0],
            x: [0, 10, 0],
            opacity: [0.55, 1, 0.55],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function TwinklingStars() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{ top: s.top, left: s.left }}
          animate={{ opacity: [0.15, 1, 0.15], scale: [0.7, 1.15, 0.7] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Star
            size={s.size}
            className="fill-pink-300 text-pink-300 drop-shadow-[0_0_4px_rgba(244,114,182,0.8)]"
          />
        </motion.span>
      ))}
    </div>
  );
}

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-pink-50/60 via-white to-white px-4 py-20">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-pink-100/40 blur-3xl" />

      <FloatingBubbles />
      <TwinklingStars />

      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center text-center">
        {/* Icon badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            animate={{ rotate: [0, -6, 6, -6, 0] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1,
            }}
            className="
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-linear-to-br
              from-pink-500
              to-rose-400
              shadow-lg
              shadow-pink-200/60
            "
          >
            <AlertTriangle size={40} className="text-white" strokeWidth={1.75} />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 text-3xl font-bold text-gray-900 sm:text-4xl"
        >
          یک خطا رخ داد
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 max-w-md leading-8 text-gray-500"
        >
          متأسفیم، مشکلی توی بارگذاری این بخش پیش اومد. می‌تونی دوباره امتحان
          کنی یا برگردی به صفحه اصلی.
        </motion.p>

        {/* Technical error detail */}
        {error?.message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-3 max-w-md rounded-2xl bg-gray-50 px-4 py-2 text-xs text-gray-400"
            dir="ltr"
          >
            {error.message}
          </motion.p>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => reset()}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="
              flex
              items-center
              gap-2
              rounded-full
              bg-linear-to-l
              from-pink-500
              to-rose-400
              px-7
              py-3.5
              font-bold
              text-white
              shadow-lg
              shadow-pink-200/50
              transition-shadow
              hover:shadow-xl
              hover:shadow-pink-300/50
            "
          >
            <RefreshCw size={18} />
            دوباره تلاش کن
          </motion.button>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/"
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-gray-200
                bg-white
                px-7
                py-3.5
                font-bold
                text-gray-700
                transition-colors
                hover:border-pink-500
                hover:text-pink-500
              "
            >
              <Home size={18} />
              بازگشت به خانه
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}