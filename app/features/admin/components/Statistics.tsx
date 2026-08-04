"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Star,
  Eye,
} from "lucide-react";

const statistics = [
  {
    title: "نرخ تبدیل",
    value: "12.8%",
    change: "+2.4%",
    positive: true,
    icon: TrendingUp,
    color: "emerald",
  },
  {
    title: "میانگین سفارش",
    value: "1.48M",
    suffix: "تومان",
    change: "+8.1%",
    positive: true,
    icon: DollarSign,
    color: "pink",
  },
  {
    title: "بازدید امروز",
    value: "8,945",
    change: "+15%",
    positive: true,
    icon: Eye,
    color: "blue",
  },
  {
    title: "رضایت مشتری",
    value: "98%",
    change: "-0.4%",
    positive: false,
    icon: Star,
    color: "amber",
  },
];

const progress = [
  {
    title: "موجودی انبار",
    value: 82,
    color: "bg-pink-500",
    icon: Package,
  },
  {
    title: "سفارشات تکمیل شده",
    value: 71,
    color: "bg-emerald-500",
    icon: ShoppingCart,
  },
  {
    title: "کاربران فعال",
    value: 64,
    color: "bg-blue-500",
    icon: Users,
  },
];

export default function Statistics() {
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
        rounded-4xl
        border
        border-gray-100
        bg-white
        shadow-sm
      "
    >
      {/* Header */}

      <div className="border-b border-gray-100 p-4 sm:p-6">
        <h2 className="text-lg font-black text-gray-900 sm:text-xl">
          آمار سریع
        </h2>

        <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
          خلاصه عملکرد فروشگاه
        </p>
      </div>

      {/* Statistics */}

      <div className="space-y-3 p-4 sm:space-y-4 sm:p-6">
        {statistics.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
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
              whileHover={{
                x: -3,
              }}
              className="
                rounded-2xl
                border
                border-gray-100
                bg-gray-50
                p-3
                transition-all
                hover:bg-white
                hover:shadow-md
                sm:rounded-3xl
                sm:p-4
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500 sm:text-sm">
                    {item.title}
                  </p>

                  <div className="mt-1.5 flex items-end gap-1.5 sm:mt-2 sm:gap-2">
                    <h3 className="text-xl font-black sm:text-2xl">
                      {item.value}
                    </h3>

                    {item.suffix && (
                      <span className="pb-0.5 text-[10px] text-gray-400 sm:pb-1 sm:text-xs">
                        {item.suffix}
                      </span>
                    )}
                  </div>

                  <div
                    className={`mt-2 flex items-center gap-1 text-xs font-bold sm:mt-3 sm:text-sm ${
                      item.positive
                        ? "text-emerald-500"
                        : "text-red-500"
                    }`}
                  >
                    {item.positive ? (
                      <TrendingUp size={14} />
                    ) : (
                      <TrendingDown size={14} />
                    )}

                    {item.change}
                  </div>
                </div>

                <div
                  className={`
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl

                    sm:h-14
                    sm:w-14
                    sm:rounded-2xl

                    ${
                      item.color === "pink"
                        ? "bg-pink-100 text-pink-500"
                        : item.color === "emerald"
                        ? "bg-emerald-100 text-emerald-500"
                        : item.color === "blue"
                        ? "bg-blue-100 text-blue-500"
                        : "bg-amber-100 text-amber-500"
                    }
                  `}
                >
                  <Icon size={18} className="sm:hidden" />
                  <Icon size={24} className="hidden sm:block" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress */}

      <div className="border-t border-gray-100 p-4 sm:p-6">
        <h3 className="mb-4 font-bold text-gray-900 sm:mb-5">
          وضعیت فروشگاه
        </h3>

        <div className="space-y-4 sm:space-y-5">
          {progress.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: index * 0.1,
                }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon
                      size={18}
                      className="text-gray-500"
                    />

                    <span className="text-sm font-medium">
                      {item.title}
                    </span>
                  </div>

                  <span className="text-sm font-bold">
                    {item.value}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${item.value}%`,
                    }}
                    transition={{
                      duration: 1,
                      delay: index * 0.2,
                    }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}