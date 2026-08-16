"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

type Bubble = {
  size: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
};

type StarItem = {
  size: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
};

const bubbles: Bubble[] = [
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

const stars: StarItem[] = [
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
      {bubbles.map((bubble) => (
        <motion.span
          key={`${bubble.top}-${bubble.left}`}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            top: bubble.top,
            left: bubble.left,
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
            duration: bubble.duration,
            delay: bubble.delay,
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
      {stars.map((star) => (
        <motion.span
          key={`${star.top}-${star.left}`}
          className="absolute"
          style={{ top: star.top, left: star.left }}
          animate={{ opacity: [0.15, 1, 0.15], scale: [0.7, 1.15, 0.7] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Star
            size={star.size}
            className="fill-pink-300 text-pink-300 drop-shadow-[0_0_4px_rgba(244,114,182,0.8)]"
          />
        </motion.span>
      ))}
    </div>
  );
}

function LoadingDots() {
  return (
    <span className="flex items-center gap-0.5">
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -3, 0] }}
          transition={{
            duration: 1.1,
            delay: dot * 0.18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-1.5 w-1.5 rounded-full bg-pink-500"
        />
      ))}
    </span>
  );
}

export default function Loading() {
  return (
    <div
      role="status"
      aria-label="در حال بارگذاری"
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-linear-to-b from-pink-50/60 via-white to-white px-4 py-20"
    >
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-pink-100/40 blur-3xl" />

      <FloatingBubbles />
      <TwinklingStars />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Ring loader with pulsing logo dot */}
        <div className="relative flex h-28 w-28 items-center justify-center">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-4 border-pink-100 border-t-pink-500"
          />

          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: 360 }}
            transition={{
              scale: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 2.2, repeat: Infinity, ease: "linear" },
            }}
            className="h-12 w-12 rounded-full bg-linear-to-br from-pink-500 to-rose-400 shadow-lg shadow-pink-200/60"
          />
        </div>

        {/* Brand name */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 text-xl font-bold text-gray-800"
        >
          اریکه شاپ
        </motion.h2>

        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-2 flex items-center gap-1 text-gray-500"
        >
          <span>در حال بارگذاری</span>
          <LoadingDots />
        </motion.p>
      </div>
    </div>
  );
}