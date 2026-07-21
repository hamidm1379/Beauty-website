"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

interface ProductsHeaderProps {
  title?: string;
  totalProducts?: number;
}

const trustBadges = [
  { icon: ShieldCheck, label: "اصالت کالا" },
  { icon: Truck, label: "ارسال سریع" },
  { icon: RotateCcw, label: "ضمانت بازگشت" },
];

/**
 * ایلوستریشن هنری با موضوع آرایشی-بهداشتی:
 * شیشه عطر + رژ لب + گل و حباب‌های شناور، همه با انیمیشن ملایم.
 * کاملاً اورجینال و ساخته‌شده با SVG، بدون وابستگی به تصویر خارجی.
 */
function BeautyIllustration() {
  return (
    <div className="relative h-48 w-64 shrink-0 sm:h-56 sm:w-80">
      {/* Glow پشت زمینه */}
      <div className="pointer-events-none absolute inset-0 m-auto h-36 w-44 rounded-full bg-linear-to-br from-pink-200/50 to-rose-100/40 blur-2xl" />

      <svg
        viewBox="0 0 300 220"
        className="relative h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* شیشه‌ی عطر */}
          <linearGradient id="glassBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbcfe8" />
            <stop offset="45%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#e11d78" />
          </linearGradient>
          <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fda4d0" />
            <stop offset="100%" stopColor="#f43f8e" />
          </linearGradient>

          {/* فلز طلایی (درِ عطر + رنگ) */}
          <radialGradient id="capGrad" cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#fff7d6" />
            <stop offset="35%" stopColor="#fcd34d" />
            <stop offset="75%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </radialGradient>

          {/* رژ لب */}
          <linearGradient id="tubeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="18%" stopColor="#fff7d6" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
          <linearGradient id="bulletGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fb7fb3" />
            <stop offset="55%" stopColor="#e0308a" />
            <stop offset="100%" stopColor="#9d174d" />
          </linearGradient>

          {/* لاک ناخن */}
          <linearGradient id="polishGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="55%" stopColor="#be123c" />
            <stop offset="100%" stopColor="#7f1d3f" />
          </linearGradient>
          <linearGradient id="polishCap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4b5563" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>

          {/* براش آرایش */}
          <linearGradient id="brushHandle" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="50%" stopColor="#d6a15c" />
            <stop offset="100%" stopColor="#7c4a1e" />
          </linearGradient>
          <radialGradient id="brushHair" cx="40%" cy="25%" r="80%">
            <stop offset="0%" stopColor="#e8c7a8" />
            <stop offset="60%" stopColor="#b98a63" />
            <stop offset="100%" stopColor="#7c5738" />
          </radialGradient>

          {/* پک کامپکت (پودر) */}
          <linearGradient id="compactBase" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbcfe8" />
            <stop offset="100%" stopColor="#db4a93" />
          </linearGradient>
          <radialGradient id="powderGrad" cx="45%" cy="35%" r="75%">
            <stop offset="0%" stopColor="#fff1f7" />
            <stop offset="100%" stopColor="#f5a8cf" />
          </radialGradient>

          {/* گلبرگ */}
          <radialGradient id="petalGrad" cx="50%" cy="20%" r="90%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#fbcfe8" />
            <stop offset="100%" stopColor="#ec7fb0" />
          </radialGradient>

          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#be185d" floodOpacity="0.22" />
          </filter>
          <filter id="blurSm">
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
        </defs>

        {/* سایه نرم مشترک زیر همه محصولات */}
        <ellipse cx="150" cy="201" rx="128" ry="9" fill="#e11d78" opacity="0.13" />

        {/* براش آرایش — پشت همه، مورب سمت چپ */}
        <motion.g
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "40px 195px" }}
          opacity={0.95}
        >
          <rect
            x="36" y="90" width="7" height="105" rx="3.5"
            fill="url(#brushHandle)"
            transform="rotate(18 40 195)"
          />
          <ellipse
            cx="55" cy="78" rx="15" ry="24"
            fill="url(#brushHair)"
            transform="rotate(18 40 195)"
          />
          <ellipse
            cx="52" cy="70" rx="5" ry="9"
            fill="#f3ddc4" opacity="0.5"
            transform="rotate(18 40 195)"
          />
        </motion.g>

        {/* لاک ناخن — جلو، سمت چپ */}
        <motion.g
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          filter="url(#softShadow)"
        >
          {/* بدنه شیشه‌ای */}
          <rect x="28" y="150" width="30" height="44" rx="6" fill="url(#polishGlass)" />
          <rect x="28" y="150" width="30" height="44" rx="6" fill="none" stroke="#ffffff" strokeOpacity="0.35" />
          {/* بازتاب نور */}
          <rect x="32" y="156" width="4" height="32" rx="2" fill="#ffffff" opacity="0.4" filter="url(#blurSm)" />
          {/* درپوش مشکی */}
          <rect x="30" y="128" width="26" height="24" rx="4" fill="url(#polishCap)" />
          <ellipse cx="37" cy="134" rx="3" ry="2" fill="#ffffff" opacity="0.3" />
          {/* دسته براش لاک */}
          <rect x="41" y="112" width="3" height="18" rx="1.5" fill="#374151" />
        </motion.g>

        {/* رژ لب — پشت شیشه عطر */}
        <motion.g
          initial={{ rotate: -10 }}
          animate={{ rotate: [-10, -6, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "104px 192px" }}
          filter="url(#softShadow)"
        >
          <rect x="92" y="126" width="26" height="64" rx="6" fill="url(#tubeGrad)" />
          <rect x="92" y="126" width="6" height="64" rx="3" fill="#fff7d6" opacity="0.55" />
          <rect x="92" y="150" width="26" height="1.4" fill="#92400e" opacity="0.3" />
          <rect x="92" y="164" width="26" height="1.4" fill="#92400e" opacity="0.3" />
          <rect x="93" y="108" width="24" height="20" rx="5" fill="#fde3ef" opacity="0.9" stroke="#f6a8cf" strokeWidth="0.6" />
          <rect x="95" y="110" width="5" height="16" rx="2.5" fill="#ffffff" opacity="0.6" />
          <path d="M95 108 Q105 78 115 108 L112 116 Q105 96 98 116 Z" fill="url(#bulletGrad)" />
          <path d="M99 106 Q105 90 107 106" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.5" filter="url(#blurSm)" />
        </motion.g>

        {/* شیشه عطر — هیرو، مرکز-راست */}
        <motion.g
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 2, 0, -2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "182px 197px" }}
          filter="url(#softShadow)"
        >
          <rect x="148" y="98" width="68" height="98" rx="18" fill="url(#glassBody)" opacity="0.94" />
          <rect x="148" y="98" width="68" height="98" rx="18" fill="none" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
          <path d="M152 150 Q182 144 212 150 L212 190 Q182 194 152 190 Z" fill="url(#liquidGrad)" opacity="0.55" />
          <rect x="159" y="106" width="10" height="80" rx="5" fill="#ffffff" opacity="0.45" filter="url(#blurSm)" transform="skewX(-8)" />
          <rect x="195" y="112" width="4" height="60" rx="2" fill="#ffffff" opacity="0.3" filter="url(#blurSm)" transform="skewX(-8)" />
          <rect x="171" y="72" width="22" height="28" rx="4" fill="#fbcfe8" opacity="0.9" />
          <rect x="171" y="72" width="22" height="28" rx="4" fill="none" stroke="#ffffff" strokeOpacity="0.5" />
          <rect x="164" y="52" width="36" height="24" rx="7" fill="url(#capGrad)" />
          <ellipse cx="174" cy="59" rx="5" ry="3" fill="#ffffff" opacity="0.55" filter="url(#blurSm)" />
          <rect x="164" y="52" width="36" height="24" rx="7" fill="none" stroke="#78350f" strokeOpacity="0.35" />
          <path d="M169 88 Q182 96 195 88" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" opacity="0.75" />
        </motion.g>

        {/* پک کامپکت پودر — جلو، سمت راست */}
        <motion.g
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          filter="url(#softShadow)"
        >
          {/* پایه فلزی */}
          <ellipse cx="252" cy="188" rx="30" ry="9" fill="url(#compactBase)" />
          <rect x="222" y="168" width="60" height="20" fill="url(#compactBase)" />
          <ellipse cx="252" cy="168" rx="30" ry="9" fill="url(#compactBase)" />
          {/* درِ نیمه‌باز نشون‌دهنده پودر */}
          <motion.g
            animate={{ rotate: [-18, -22, -18] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "252px 168px" }}
          >
            <ellipse cx="252" cy="168" rx="30" ry="9" fill="url(#powderGrad)" />
            <ellipse cx="252" cy="168" rx="30" ry="9" fill="none" stroke="#f6a8cf" strokeWidth="1" />
            <circle cx="252" cy="168" r="5" fill="#ffffff" opacity="0.7" />
          </motion.g>
          <ellipse cx="252" cy="188" rx="30" ry="9" fill="none" stroke="#c23a7d" strokeOpacity="0.4" />
        </motion.g>

        {/* گل تزئینی بالا-راست */}
        <motion.g
          animate={{ rotate: [0, 7, -7, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "268px 46px" }}
        >
          {[0, 72, 144, 216, 288].map((angle) => (
            <ellipse
              key={angle}
              cx="268"
              cy="36"
              rx="6.5"
              ry="12"
              fill="url(#petalGrad)"
              stroke="#f0a8d0"
              strokeWidth="0.6"
              transform={`rotate(${angle} 268 46)`}
            />
          ))}
          <circle cx="268" cy="46" r="5.5" fill="url(#capGrad)" />
        </motion.g>
        <path d="M280 58 Q298 53 295 72 Q276 76 280 58 Z" fill="#86efac" opacity="0.85" />
        <path d="M282 61 Q289 63 291 70" stroke="#4ade80" strokeWidth="1" opacity="0.7" />

        {/* حباب‌های شناور */}
        {[
          { cx: 16, cy: 120, r: 4, delay: 0 },
          { cx: 75, cy: 60, r: 3.5, delay: 0.6 },
          { cx: 130, cy: 40, r: 3, delay: 1.1 },
          { cx: 232, cy: 118, r: 4, delay: 0.4 },
          { cx: 285, cy: 130, r: 3, delay: 0.9 },
        ].map((b, i) => (
          <motion.circle
            key={i}
            cx={b.cx}
            cy={b.cy}
            r={b.r}
            fill="url(#petalGrad)"
            animate={{
              cy: [b.cy, b.cy - 16, b.cy],
              opacity: [0.35, 0.95, 0.35],
            }}
            transition={{
              duration: 3.5,
              delay: b.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* درخشش‌های ستاره‌ای */}
        {[
          { x: 118, y: 60, s: 8, delay: 0 },
          { x: 228, y: 95, s: 7, delay: 0.8 },
          { x: 70, y: 100, s: 5.5, delay: 1.4 },
        ].map((s, i) => (
          <motion.path
            key={i}
            d={`M${s.x} ${s.y - s.s} L${s.x + s.s * 0.28} ${s.y - s.s * 0.28} L${s.x + s.s} ${s.y} L${s.x + s.s * 0.28} ${s.y + s.s * 0.28} L${s.x} ${s.y + s.s} L${s.x - s.s * 0.28} ${s.y + s.s * 0.28} L${s.x - s.s} ${s.y} L${s.x - s.s * 0.28} ${s.y - s.s * 0.28} Z`}
            fill="#fbbf24"
            animate={{ opacity: [0.15, 1, 0.15], scale: [0.7, 1.15, 0.7] }}
            transition={{
              duration: 2.4,
              delay: s.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: `${s.x}px ${s.y}px` }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function ProductsHeader({
  title = "محصولات فروشگاه",
  totalProducts = 245,
}: ProductsHeaderProps) {
  return (
    <section className="relative mb-8 overflow-hidden rounded-3xl border border-gray-100 bg-white px-6 py-8 shadow-sm md:px-8">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-pink-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-10 h-56 w-56 rounded-full bg-rose-50 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Breadcrumb */}
        <nav className="mb-5 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="group relative transition hover:text-pink-500">
            خانه
            <span className="absolute -bottom-1 right-0 h-px w-0 bg-pink-500 transition-all duration-300 group-hover:w-full" />
          </Link>

          <ChevronLeft size={15} />

          <span className="font-medium text-gray-900">محصولات</span>
        </nav>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 12, -12, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1.5,
                }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-pink-500 to-rose-400 shadow-md shadow-pink-200/60"
              >
                <Sparkles size={20} className="text-white" />
              </motion.div>

              <h1 className="text-3xl font-black text-gray-900 sm:text-4xl">
                {title}
              </h1>
            </div>

            <p className="mt-4 max-w-2xl leading-8 text-gray-500">
              مجموعه‌ای از بهترین محصولات آرایشی، مراقبت پوست و مو از
              برندهای معتبر دنیا با تضمین اصالت کالا و ارسال سریع.
            </p>

            {/* Trust badges */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {trustBadges.map(({ icon: Icon, label }) => (
                <motion.span
                  key={label}
                  whileHover={{ y: -2 }}
                  className="cursor-default flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  <Icon size={13} className="text-pink-500" />
                  {label}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Right — illustration */}
          <BeautyIllustration />
        </div>
      </motion.div>
    </section>
  );
}