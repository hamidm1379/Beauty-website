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
      "در صورت وجود هرگونه سوال درباره حریم خصوصی می‌توانید با تیم پشتیبانی اریکه در ارتباط باشید.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16">
        {/* Hero */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm sm:rounded-[40px] sm:p-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-500 sm:h-20 sm:w-20 sm:rounded-3xl">
              <ShieldCheck size={28} className="sm:hidden" />
              <ShieldCheck size={42} className="hidden sm:block" />
            </div>

            <h1 className="mt-5 text-2xl font-black text-gray-900 sm:mt-8 sm:text-5xl">
              حریم خصوصی
            </h1>

            <p className="mt-3 text-xs leading-6 text-gray-600 sm:mt-6 sm:text-lg sm:leading-9">
              حفظ اطلاعات شخصی کاربران برای فروشگاه اینترنتی
              <span className="font-bold text-pink-500">
                {" "}اریکه{" "}
              </span>
              از مهم‌ترین اولویت‌ها است. در این صفحه توضیح داده‌ایم چه
              اطلاعاتی جمع‌آوری می‌شود، چگونه از آن استفاده می‌کنیم و چگونه از
              آن محافظت خواهیم کرد.
            </p>
          </div>
        </motion.div>
        {/* Sections */}

        <div className="mt-6 grid gap-4 sm:mt-14 sm:gap-8 lg:grid-cols-2">
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

                  rounded-2xl
                  sm:rounded-4xl

                  border
                  border-gray-100

                  bg-white

                  p-4
                  sm:p-8

                  shadow-sm

                  transition-all

                  hover:border-pink-200
                  hover:shadow-xl
                "
              >
                {/* Header */}

                <div className="flex items-center gap-3 sm:gap-5">
                  <div
                    className="
                      flex

                      h-10
                      w-10
                      sm:h-16
                      sm:w-16

                      shrink-0

                      items-center
                      justify-center

                      rounded-xl
                      sm:rounded-3xl

                      bg-pink-100

                      text-pink-500

                      transition

                      group-hover:scale-110
                    "
                  >
                    <Icon size={18} className="sm:hidden" />
                    <Icon size={30} className="hidden sm:block" />
                  </div>

                  <div>
                    <h3 className="text-base font-black text-gray-900 sm:text-2xl">
                      {section.title}
                    </h3>

                    <p className="mt-0.5 text-[11px] text-gray-500 sm:mt-2 sm:text-sm">
                      توضیحات مربوط به این بخش
                    </p>
                  </div>
                </div>

                {/* Content */}

                <ul className="mt-4 space-y-2 sm:mt-8 sm:space-y-4">
                  {section.content.map((item) => (
                    <li
                      key={item}
                      className="
                        flex
                        items-start
                        gap-2
                        sm:gap-3

                        rounded-xl
                        sm:rounded-2xl

                        bg-pink-50/50

                        p-2.5
                        sm:p-4
                      "
                    >
                      <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-500 sm:h-2.5 sm:w-2.5" />

                      <span className="text-xs leading-6 text-gray-700 sm:text-base sm:leading-8">
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