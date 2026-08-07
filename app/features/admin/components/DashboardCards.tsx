"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface DashboardData {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
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

export default function DashboardCards({ data }: Props) {
  const cards = [
    {
      title: "درآمد کل",
      value: formatRevenue(data.totalRevenue),
      suffix: "تومان",
      change: "",
      positive: true,
      icon: DollarSign,
      color: "from-emerald-500 to-green-500",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
    {
      title: "سفارشات",
      value: data.totalOrders.toLocaleString("fa-IR"),
      suffix: "سفارش",
      change: "",
      positive: true,
      icon: ShoppingBag,
      color: "from-pink-500 to-rose-500",
      bg: "bg-pink-50",
      text: "text-pink-600",
    },
    {
      title: "کاربران",
      value: data.totalUsers.toLocaleString("fa-IR"),
      suffix: "نفر",
      change: "",
      positive: true,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "محصولات",
      value: data.totalProducts.toLocaleString("fa-IR"),
      suffix: "کالا",
      change: "",
      positive: true,
      icon: Package,
      color: "from-orange-500 to-amber-500",
      bg: "bg-orange-50",
      text: "text-orange-600",
    },
  ];

  return (
    <section className="grid gap-3 grid-cols-2 sm:gap-4 lg:gap-6 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
              duration: 0.45,
            }}
            whileHover={{
              y: -6,
            }}
            className="
              group
              relative
              overflow-hidden

              rounded-2xl
              sm:rounded-3xl
              lg:rounded-4xl

              border
              border-gray-100

              bg-white

              p-3
              sm:p-4
              lg:p-6

              shadow-sm

              transition-all

              hover:shadow-xl
            "
          >
            {/* Glow */}

            <div
              className={`
                absolute
                -left-16
                -top-16

                h-40
                w-40

                rounded-full

                bg-linear-to-br
                ${card.color}

                opacity-[0.08]

                blur-3xl
              `}
            />

            {/* Header */}

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-[10px] font-medium text-gray-500 sm:text-xs lg:text-sm">
                  {card.title}
                </p>

                <h3 className="mt-1 text-lg font-black text-gray-900 sm:mt-2 sm:text-2xl lg:mt-3 lg:text-3xl">
                  {card.value}
                </h3>

                <span className="mt-0.5 block text-[10px] text-gray-400 sm:text-xs lg:text-sm">
                  {card.suffix}
                </span>
              </div>

              <div
                className={`
                  flex
                  h-9
                  w-9

                  items-center
                  justify-center

                  rounded-xl
                  sm:h-12
                  sm:w-12
                  sm:rounded-2xl
                  lg:h-16
                  lg:w-16
                  lg:rounded-3xl

                  ${card.bg}
                `}
              >
                <div
                  className={`
                    flex
                    h-7
                    w-7

                    items-center
                    justify-center

                    rounded-lg
                    sm:h-9
                    sm:w-9
                    sm:rounded-xl
                    lg:h-12
                    lg:w-12
                    lg:rounded-2xl

                    bg-linear-to-br
                    ${card.color}

                    text-white

                    shadow-lg
                  `}
                >
                  <Icon size={16} className="sm:hidden" />
                  <Icon size={20} className="hidden sm:block lg:hidden" />
                  <Icon size={26} className="hidden lg:block" />
                </div>
              </div>
            </div>

            {/* Mini Chart */}

            <div className="mt-3 flex h-8 items-end gap-0.5 sm:mt-5 sm:h-10 sm:gap-1 lg:mt-8 lg:h-14 lg:gap-1.5">
              {[35, 70, 45, 82, 60, 95, 75].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{
                    height: 0,
                  }}
                  animate={{
                    height,
                  }}
                  transition={{
                    delay: index * 0.08 + i * 0.05,
                  }}
                  className={`
                    flex-1

                    rounded-full

                    bg-linear-to-t
                    ${card.color}

                    opacity-70
                  `}
                />
              ))}
            </div>

            {/* Footer */}

            <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 sm:mt-4 sm:pt-4 lg:mt-6 lg:pt-5">
              <div
                className={`
                  flex
                  items-center
                  gap-1
                  text-[10px]
                  font-bold
                  sm:gap-1.5
                  sm:text-xs
                  lg:gap-2
                  lg:text-sm

                  ${
                    card.positive
                      ? "text-emerald-500"
                      : "text-red-500"
                  }
                `}
              >
                {card.positive ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <ArrowDownRight size={14} />
                )}

                {card.change || "—"}
              </div>

              <span className="text-[9px] text-gray-400 sm:text-[10px] lg:text-xs">
                نسبت به هفته گذشته
              </span>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}
