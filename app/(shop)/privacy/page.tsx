"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  UserCheck,
  Database,
  Mail,
  Cookie,
} from "lucide-react";

const sections = [
  {
    icon: Database,
    title: "اطلاعاتی که جمع‌آوری می‌کنیم",
    content: [
      "نام و نام خانوادگی",
      "شماره موبایل",
      "آدرس ایمیل",
      "آدرس‌های ثبت شده",
      "سفارش‌ها و تاریخچه خرید",
      "لیست علاقه‌مندی‌ها",
    ],
  },
  {
    icon: UserCheck,
    title: "نحوه استفاده از اطلاعات",
    content: [
      "ثبت و پردازش سفارش",
      "ارسال کالا",
      "پشتیبانی کاربران",
      "بهبود کیفیت خدمات",
      "اطلاع‌رسانی وضعیت سفارش",
    ],
  },
  {
    icon: Lock,
    title: "امنیت اطلاعات",
    content: [
      "رمزهای عبور به صورت Hash ذخیره می‌شوند.",
      "اطلاعات کاربران محرمانه باقی می‌ماند.",
      "دسترسی به اطلاعات تنها برای مدیران مجاز امکان‌پذیر است.",
      "تمام ارتباطات از طریق SSL رمزنگاری می‌شود.",
    ],
  },
  {
    icon: Cookie,
    title: "کوکی‌ها",
    content: [
      "حفظ ورود کاربر",
      "ذخیره سبد خرید",
      "بهبود تجربه کاربری",
    ],
  },
  {
    icon: Mail,
    title: "ارتباط با ما",
    content: [
      "در صورت وجود هرگونه سوال درباره حریم خصوصی می‌توانید با تیم پشتیبانی زیبارو در ارتباط باشید.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Hero */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[40px] border border-pink-100 bg-white p-12 shadow-sm"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-pink-100 text-pink-500">
              <ShieldCheck size={42} />
            </div>

            <h1 className="mt-8 text-5xl font-black text-gray-900">
              حریم خصوصی
            </h1>

            <p className="mt-6 text-lg leading-9 text-gray-600">
              حفظ اطلاعات شخصی کاربران برای فروشگاه اینترنتی
              <span className="font-bold text-pink-500">
                {" "}زیبارو{" "}
              </span>
              از مهم‌ترین اولویت‌ها است. در این صفحه توضیح داده‌ایم چه
              اطلاعاتی جمع‌آوری می‌شود، چگونه از آن استفاده می‌کنیم و چگونه از
              آن محافظت خواهیم کرد.
            </p>
          </div>
        </motion.div>
        {/* Sections */}

<div className="mt-14 grid gap-8 lg:grid-cols-2">
  {sections.map((section, index) => {
    const Icon = section.icon;

    return (
      <motion.div
        key={section.title}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: index * 0.08,
        }}
        whileHover={{
          y: -6,
        }}
        className="
          group

          rounded-4xl

          border
          border-gray-100

          bg-white

          p-8

          shadow-sm

          transition-all

          hover:border-pink-200
          hover:shadow-xl
        "
      >
        {/* Header */}

        <div className="flex items-center gap-5">
          <div
            className="
              flex

              h-16
              w-16

              items-center
              justify-center

              rounded-3xl

              bg-pink-100

              text-pink-500

              transition

              group-hover:scale-110
            "
          >
            <Icon size={30} />
          </div>

          <div>
            <h3 className="text-2xl font-black text-gray-900">
              {section.title}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              توضیحات مربوط به این بخش
            </p>
          </div>
        </div>

        {/* Content */}

        <ul className="mt-8 space-y-4">
          {section.content.map((item) => (
            <li
              key={item}
              className="
                flex
                items-start
                gap-3

                rounded-2xl

                bg-pink-50/50

                p-4
              "
            >
              <div className="mt-1 h-2.5 w-2.5 rounded-full bg-pink-500" />

              <span className="leading-8 text-gray-700">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    );
  })}
</div>
      </div>
    </main>
  );
}