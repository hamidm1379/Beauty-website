"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  UserPlus,
  Package,
  CreditCard,
  MessageSquare,
  Star,
  ChevronLeft,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "سفارش جدید ثبت شد",
    description: "محمد احمدی سفارش #ORD-10254 را ثبت کرد.",
    time: "۲ دقیقه پیش",
    icon: ShoppingBag,
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: 2,
    title: "کاربر جدید ثبت نام کرد",
    description: "کاربر جدید با ایمیل ali@gmail.com ایجاد شد.",
    time: "۱۵ دقیقه پیش",
    icon: UserPlus,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    title: "موجودی محصول کم شد",
    description: "موجودی کرم آبرسان به کمتر از ۱۰ عدد رسید.",
    time: "۳۵ دقیقه پیش",
    icon: Package,
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 4,
    title: "پرداخت موفق",
    description: "پرداخت ۳,۲۰۰,۰۰۰ تومان با موفقیت انجام شد.",
    time: "۱ ساعت پیش",
    icon: CreditCard,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    id: 5,
    title: "نظر جدید ثبت شد",
    description: "برای محصول «سرم ویتامین C» نظر جدیدی ارسال شد.",
    time: "۲ ساعت پیش",
    icon: MessageSquare,
    color: "bg-violet-100 text-violet-600",
  },
  {
    id: 6,
    title: "امتیاز ۵ ستاره",
    description: "کاربر به رژ لب مات امتیاز کامل داد.",
    time: "۳ ساعت پیش",
    icon: Star,
    color: "bg-amber-100 text-amber-600",
  },
];

export default function RecentActivities() {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        overflow-hidden
        rounded-4xl
        border
        border-gray-100
        bg-white
        shadow-sm
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-gray-100 p-4 sm:p-6">
        <div>
          <h2 className="text-lg font-black text-gray-900 sm:text-xl">
            فعالیت‌های اخیر
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:mt-2 sm:text-sm">
            آخرین اتفاقات فروشگاه
          </p>
        </div>

        <button
          className="
            hidden
            items-center
            gap-2

            rounded-2xl

            bg-pink-50

            px-4
            py-3

            text-sm
            font-semibold

            text-pink-600

            transition

            hover:bg-pink-100
            sm:flex
          "
        >
          مشاهده همه

          <ChevronLeft size={18} />
        </button>
      </div>

      {/* Timeline */}

      <div className="relative p-4 sm:p-6">
        {/* Line */}

        <div
          className="
            absolute
            right-9
            top-0
            bottom-0
            w-px
            bg-gray-200
            sm:right-11.5
          "
        />

        <div className="space-y-6 sm:space-y-8">
          {activities.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <motion.div
                key={activity.id}
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                className="relative flex gap-4 sm:gap-5"
              >
                {/* Icon */}

                <div
                  className={`
                    relative
                    z-10

                    flex
                    h-10
                    w-10
                    shrink-0

                    items-center
                    justify-center

                    rounded-xl
                    sm:h-14
                    sm:w-14
                    sm:rounded-2xl

                    ${activity.color}
                  `}
                >
                  <Icon size={18} className="sm:hidden" />
                  <Icon size={24} className="hidden sm:block" />
                </div>

                {/* Content */}

                <motion.div
                  whileHover={{
                    y: -3,
                  }}
                  className="
                    flex-1

                    rounded-2xl
                    sm:rounded-3xl

                    border
                    border-gray-100

                    bg-gray-50

                    p-3.5
                    sm:p-5

                    transition-all

                    hover:bg-white
                    hover:shadow-md
                  "
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-900 sm:text-base">
                      {activity.title}
                    </h3>

                    <span className="text-[10px] text-gray-400 sm:text-xs">
                      {activity.time}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-6 text-gray-500 sm:mt-3 sm:text-sm sm:leading-7">
                    {activity.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}