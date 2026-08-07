"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Eye,
  CheckCircle2,
} from "lucide-react";

interface DashboardData {
  totalOrders: number;
  deliveredOrders: number;
  pendingOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  totalUsers: number;
  activeUsers: number;
  totalProducts: number;
  activeProducts: number;
  outOfStockProducts: number;
}

interface Props {
  data: DashboardData;
}

function formatRevenue(toman: number): string {
  if (toman >= 1_000_000_000) {
    return `${(toman / 1_000_000_000).toFixed(1)}M`;
  }
  if (toman >= 1_000_000) {
    return `${(toman / 1_000_000).toFixed(1)}M`;
  }
  if (toman >= 1_000) {
    return `${(toman / 1_000).toFixed(0)}K`;
  }
  return toman.toLocaleString("fa-IR");
}

export default function Statistics({ data }: Props) {
  const avgOrderValue =
    data.totalOrders > 0 ? data.totalRevenue / data.totalOrders : 0;

  const completionRate =
    data.totalOrders > 0
      ? Math.round((data.deliveredOrders / data.totalOrders) * 100)
      : 0;

  const activeUserRate =
    data.totalUsers > 0
      ? Math.round((data.activeUsers / data.totalUsers) * 100)
      : 0;

  const inventoryRate =
    data.totalProducts > 0
      ? Math.round(
          ((data.totalProducts - data.outOfStockProducts) /
            data.totalProducts) *
            100,
        )
      : 0;

  const statistics = [
    {
      title: "میانگین سفارش",
      value: formatRevenue(avgOrderValue),
      suffix: "تومان",
      change: "",
      positive: true,
      icon: DollarSign,
      color: "pink",
    },
    {
      title: "سفارشات موفق",
      value: `${completionRate}%`,
      change: "",
      positive: true,
      icon: CheckCircle2,
      color: "emerald",
    },
    {
      title: "کاربران فعال",
      value: data.activeUsers.toLocaleString("fa-IR"),
      suffix: "نفر",
      change: "",
      positive: true,
      icon: Users,
      color: "blue",
    },
    {
      title: "موجودی انبار",
      value: `${inventoryRate}%`,
      change: "",
      positive: inventoryRate > 50,
      icon: Package,
      color: inventoryRate > 50 ? "emerald" : "amber",
    },
  ];

  const progress = [
    {
      title: "موجودی انبار",
      value: inventoryRate,
      color: "bg-pink-500",
      icon: Package,
    },
    {
      title: "سفارشات تکمیل شده",
      value: completionRate,
      color: "bg-emerald-500",
      icon: ShoppingCart,
    },
    {
      title: "کاربران فعال",
      value: activeUserRate,
      color: "bg-blue-500",
      icon: Users,
    },
  ];

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

      <div className="border-b border-gray-100 p-3 sm:p-4 lg:p-6">
        <h2 className="text-base font-black text-gray-900 sm:text-lg lg:text-xl">
          آمار سریع
        </h2>

        <p className="mt-1 text-[10px] text-gray-500 sm:mt-1.5 sm:text-xs lg:mt-2 lg:text-sm">
          خلاصه عملکرد فروشگاه
        </p>
      </div>

      {/* Statistics */}

      <div className="space-y-2 p-3 sm:space-y-3 sm:p-4 lg:space-y-4 lg:p-6">
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
                rounded-xl
                border
                border-gray-100
                bg-gray-50
                p-2.5
                transition-all
                hover:bg-white
                hover:shadow-md
                sm:rounded-2xl
                sm:p-3
                lg:rounded-3xl
                lg:p-4
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] text-gray-500 sm:text-xs lg:text-sm">
                    {item.title}
                  </p>

                  <div className="mt-1 flex items-end gap-1 sm:mt-1.5 sm:gap-1.5 lg:mt-2 lg:gap-2">
                    <h3 className="text-base font-black sm:text-xl lg:text-2xl">
                      {item.value}
                    </h3>

                    {item.suffix && (
                      <span className="pb-0.5 text-[9px] text-gray-400 sm:text-[10px] lg:pb-1 lg:text-xs">
                        {item.suffix}
                      </span>
                    )}
                  </div>

                  {item.change && (
                    <div
                      className={`mt-1.5 flex items-center gap-1 text-[10px] font-bold sm:mt-2 sm:text-xs lg:mt-3 lg:text-sm ${
                        item.positive
                          ? "text-emerald-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.positive ? (
                        <TrendingUp size={12} />
                      ) : (
                        <TrendingDown size={12} />
                      )}

                      {item.change}
                    </div>
                  )}
                </div>

                <div
                  className={`
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg

                    sm:h-10
                    sm:w-10
                    sm:rounded-xl

                    lg:h-14
                    lg:w-14
                    lg:rounded-2xl

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
                  <Icon size={16} className="sm:hidden" />
                  <Icon size={18} className="hidden sm:block lg:hidden" />
                  <Icon size={24} className="hidden lg:block" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress */}

      <div className="border-t border-gray-100 p-3 sm:p-4 lg:p-6">
        <h3 className="mb-3 text-sm font-bold text-gray-900 sm:mb-4 lg:mb-5">
          وضعیت فروشگاه
        </h3>

        <div className="space-y-3 sm:space-y-4 lg:space-y-5">
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
                <div className="mb-1.5 flex items-center justify-between sm:mb-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Icon
                      size={14}
                      className="text-gray-500 sm:hidden"
                    />
                    <Icon
                      size={16}
                      className="hidden text-gray-500 sm:block"
                    />

                    <span className="text-xs font-medium sm:text-sm">
                      {item.title}
                    </span>
                  </div>

                  <span className="text-xs font-bold sm:text-sm">
                    {item.value}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-100 sm:h-2.5 lg:h-3">
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
