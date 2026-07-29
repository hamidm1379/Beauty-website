"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Send, MessageCircle, Mail, ArrowLeft, Star } from "lucide-react";
import enamad from "@/public/images.png";
import { toast } from "sonner";

const quickLinks = [
  { href: "/", label: "صفحه اصلی" },
  { href: "/shop", label: "فروشگاه" },
  { href: "/products", label: "محصولات" },
  { href: "/brands", label: "برندها" },
  { href: "/contact", label: "تماس با ما" },
];

const serviceLinks = [
  { href: "/account", label: "پیگیری سفارش" },
  { href: "#", label: "قوانین و مقررات" },
  { href: "#", label: "حریم خصوصی" },
];

const infoLinks = [
  { href: "/aboutus", label: "درباره ما" },
  { href: "/articles", label: "مقالات" },
  { href: "/faq", label: "سوالات متداول" },
];

const socials = [
  // { icon: Instagram, href: "#", label: "اینستاگرام" },
  { icon: Send, href: "#", label: "تلگرام" },
  { icon: MessageCircle, href: "#", label: "واتساپ" },
];

function FooterLinkGroup({
  title,
  links,
  delay,
}: {
  title: string;
  links: { href: string; label: string }[];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
    >
      <h4 className="mb-6 text-lg font-bold text-gray-900">{title}</h4>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="
                group
                relative
                inline-flex
                items-center
                text-gray-500
                transition-colors
                duration-300
                hover:text-pink-500
              "
            >
              <span>{link.label}</span>
              <span
                className="
                  absolute
                  -bottom-1
                  right-0
                  h-px
                  w-0
                  bg-pink-500
                  transition-all
                  duration-300
                  group-hover:w-full
                "
              />
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

const bubbles = [
  { size: 46, top: "8%", left: "6%", duration: 7, delay: 0 },
  { size: 24, top: "22%", left: "17%", duration: 5.5, delay: 0.6 },
  { size: 64, top: "58%", left: "3%", duration: 8.5, delay: 1.2 },
  { size: 30, top: "80%", left: "13%", duration: 6, delay: 0.3 },
  { size: 50, top: "10%", left: "90%", duration: 7.5, delay: 0.9 },
  { size: 26, top: "40%", left: "95%", duration: 5, delay: 0.2 },
  { size: 56, top: "72%", left: "88%", duration: 9, delay: 1.5 },
  { size: 20, top: "90%", left: "78%", duration: 6.5, delay: 0.8 },
  { size: 34, top: "46%", left: "50%", duration: 8, delay: 1.8 },
  { size: 22, top: "4%", left: "42%", duration: 6.2, delay: 1.1 },
  { size: 40, top: "62%", left: "35%", duration: 7.2, delay: 0.4 },
  { size: 18, top: "30%", left: "70%", duration: 5.8, delay: 1.4 },
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

const stars = [
  { size: 16, top: "14%", left: "28%", duration: 2.2, delay: 0 },
  { size: 10, top: "34%", left: "8%", duration: 2.8, delay: 0.5 },
  { size: 14, top: "6%", left: "62%", duration: 2.4, delay: 1 },
  { size: 9, top: "50%", left: "22%", duration: 3, delay: 0.3 },
  { size: 18, top: "66%", left: "58%", duration: 2.6, delay: 1.4 },
  { size: 11, top: "26%", left: "80%", duration: 2.3, delay: 0.8 },
  { size: 13, top: "84%", left: "36%", duration: 2.9, delay: 0.2 },
  { size: 10, top: "48%", left: "84%", duration: 2.5, delay: 1.1 },
  { size: 15, top: "75%", left: "68%", duration: 2.7, delay: 0.6 },
];

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

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("لطفاً ایمیل خود را وارد کنید.");
    } else {
      toast.success("با موفقیت عضو خبرنامه شدید 🎉");
    }

    setEmail("");
  };
  return (
    <footer className="relative overflow-hidden border-t border-gray-100 bg-linear-to-b from-pink-50/60 via-white to-white">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-pink-100/40 blur-3xl" />

      {/* Floating bubbles */}
      <FloatingBubbles />

      {/* Twinkling stars */}
      <TwinklingStars />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-6 lg:px-8">
        {/* Newsletter — signature element */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="
    relative
    mb-16
    overflow-hidden
    rounded-2xl
    md:rounded-4xl

    border
    border-pink-200
    
    bg-white
    p-6
    md:p-8

    shadow-xl
    shadow-pink-200/60
  "
        >
          {/* Decoration */}
          <div className="absolute -top-24 -left-20 h-56 w-56 rounded-full bg-pink-100 blur-3xl opacity-70" />
          <div className="absolute -bottom-24 -right-20 h-56 w-56 rounded-full bg-rose-100 blur-3xl opacity-70" />

          <div className="relative flex flex-col items-center justify-between gap-4 md:gap-8 lg:flex-row">
            {/* Text */}
            <div className="max-w-xl text-center lg:text-right">
              <span
                className="
          inline-flex
          items-center
          rounded-full
          bg-pink-50
          px-4
          py-2
          text-[13px]
          sm:text-sm
          font-bold
          text-pink-600
        "
              >
                خبرنامه زیبارو
              </span>

              <h3 className="mt-2 md:mt-5 text-xl sm:text-2xl md:text-3xl font-black text-gray-900">
                عضو خبرنامه شوید
              </h3>

              <p className="mt-3 max-sm:text-sm leading-8 text-gray-500">
                جدیدترین تخفیف‌ها، محصولات جدید و نکات آرایشی را زودتر از همه
                دریافت کنید.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubscribe}
              className="
        flex
        w-full
        
        items-center
        gap-0.5
        sm:gap-3

        rounded-2xl

        border
        border-gray-200

        bg-gray-50
        p-2

        transition

        focus-within:border-pink-400
        focus-within:bg-white
        focus-within:shadow-lg
      "
            >
              <div className="flex h-8 w-8 md:h-11 md:w-11 items-center justify-center rounded-lg md:rounded-xl md:bg-pink-100 text-pink-500">
                <Mail size={18} />
              </div>

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="ایمیل خود را وارد کنید..."
                className="
          flex-1
          bg-transparent
          text-gray-700
          outline-none
          placeholder:text-gray-400
          placeholder:max-md:text-[11px]
          max-sm:text-[11px]
          w-full
        "
              />

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
          flex
          items-center
          gap-0.5
          sm:gap-2
          cursor-pointer
          rounded-md
          sm:rounded-xl

          text-[12px]
          bg-pink-500
          
          px-1
          py-1.5

          sm:px-6
          sm:py-3

          sm:font-bold

          text-white

          shadow-lg

          transition

          hover:bg-pink-600
        "
              >
                عضویت
                <ArrowLeft size={14} />
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Main grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-10 w-10 rounded-full bg-linear-to-br from-pink-500 to-rose-400"
              />
              <h3 className="text-2xl font-bold text-gray-800">زیبارو</h3>
            </div>

            <p className="leading-8 text-gray-500">
              فروشگاه اینترنتی زیبارو، مرجع تخصصی فروش محصولات آرایشی و بهداشتی
              اصل با بهترین قیمت و ارسال سریع.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2.4,
                    delay: i * 0.25,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    scale: 1.15,
                    rotate: -8,
                    boxShadow: "0 8px 20px -4px rgba(236, 72, 153, 0.45)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    relative

                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-gray-200
                    bg-white
                    text-gray-500
                    transition-colors
                    duration-300
                    hover:border-pink-500
                    hover:bg-pink-500
                    hover:text-white
                  "
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <FooterLinkGroup
            title="دسترسی سریع"
            links={quickLinks}
            delay={0.05}
          />
          <FooterLinkGroup
            title="خدمات مشتریان"
            links={serviceLinks}
            delay={0.1}
          />
          <FooterLinkGroup title="اطلاعات" links={infoLinks} delay={0.15} />
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-100" />

        {/* Bottom footer */}
        <div className="flex flex-col-reverse items-center justify-between gap-4 text-center text-sm text-gray-400 md:flex-row">
          <p>© 2026 تمامی حقوق این وب‌سایت محفوظ است.</p>

          <p>
            <Image
              width={220}
              height={200}
              src={enamad}
              alt="نماد اعتماد الکترونیکی"
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
