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
    description: "محمد احمدی سفارش #10254 را ثبت کرد.",
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
        rounded-2xl
        sm:rounded-3xl
        lg:rounded-4xl
        border
        border-gray-100
        bg-white
        shadow-sm
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-gray-100 p-3 sm:p-4 lg:p-6">
        <div>
          <h2 className="text-base font-black text-gray-900 sm:text-lg lg:text-xl">
            فعالیت‌های اخیر
          </h2>

          <p className="mt-0.5 text-[10px] text-gray-500 sm:mt-1 sm:text-xs lg:mt-2 lg:text-sm">
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

      <div className="relative p-3 sm:p-4 lg:p-6">
        {/* Line */}

        <div
          className="
            absolute
            right-7
            top-0
            bottom-0
            w-px
            bg-gray-200
            sm:right-9
            lg:right-11.5
          "
        />

        <div className="space-y-4 sm:space-y-5 lg:space-y-8">
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
                className="relative flex gap-3 sm:gap-4 lg:gap-5"
              >
                {/* Icon */}

                <div
                  className={`
                    relative
                    z-10

                    flex
                    h-8
                    w-8
                    shrink-0

                    items-center
                    justify-center

                    rounded-lg
                    sm:h-10
                    sm:w-10
                    sm:rounded-xl
                    lg:h-14
                    lg:w-14
                    lg:rounded-2xl

                    ${activity.color}
                  `}
                >
                  <Icon size={14} className="sm:hidden" />
                  <Icon size={18} className="hidden sm:block lg:hidden" />
                  <Icon size={24} className="hidden lg:block" />
                </div>

                {/* Content */}

                <motion.div
                  whileHover={{
                    y: -3,
                  }}
                  className="
                    flex-1

                    rounded-xl
                    sm:rounded-2xl
                    lg:rounded-3xl

                    border
                    border-gray-100

                    bg-gray-50

                    p-2.5
                    sm:p-3.5
                    lg:p-5

                    transition-all

                    hover:bg-white
                    hover:shadow-md
                  "
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-gray-900 sm:text-sm lg:text-base">
                      {activity.title}
                    </h3>

                    <span className="text-[9px] text-gray-400 sm:text-[10px] lg:text-xs">
                      {activity.time}
                    </span>
                  </div>

                  <p className="mt-1.5 text-[10px] leading-5 text-gray-500 sm:mt-2 sm:text-xs sm:leading-6 lg:mt-3 lg:text-sm lg:leading-7">
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
