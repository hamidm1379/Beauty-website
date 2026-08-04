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

const cards = [
  {
    title: "درآمد امروز",
    value: "۲۸,۴۵۰,۰۰۰",
    suffix: "تومان",
    change: "+18.6%",
    positive: true,
    icon: DollarSign,
    color: "from-emerald-500 to-green-500",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  {
    title: "سفارشات",
    value: "۳۲۸",
    suffix: "سفارش",
    change: "+12.3%",
    positive: true,
    icon: ShoppingBag,
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-50",
    text: "text-pink-600",
  },
  {
    title: "کاربران",
    value: "۱۲,۸۹۰",
    suffix: "نفر",
    change: "+5.1%",
    positive: true,
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    title: "محصولات",
    value: "۲۴۵",
    suffix: "کالا",
    change: "-2.4%",
    positive: false,
    icon: Package,
    color: "from-orange-500 to-amber-500",
    bg: "bg-orange-50",
    text: "text-orange-600",
  },
];

export default function DashboardCards() {
  return (
    <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
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

              rounded-3xl
              sm:rounded-4xl

              border
              border-gray-100

              bg-white

              p-4
              sm:p-6

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
                <p className="text-xs font-medium text-gray-500 sm:text-sm">
                  {card.title}
                </p>

                <h3 className="mt-2 text-2xl font-black text-gray-900 sm:mt-3 sm:text-3xl">
                  {card.value}
                </h3>

                <span className="mt-1 block text-xs text-gray-400 sm:text-sm">
                  {card.suffix}
                </span>
              </div>

              <div
                className={`
                  flex
                  h-12
                  w-12

                  items-center
                  justify-center

                  rounded-2xl
                  sm:h-16
                  sm:w-16
                  sm:rounded-3xl

                  ${card.bg}
                `}
              >
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

                    bg-linear-to-br
                    ${card.color}

                    text-white

                    shadow-lg
                  `}
                >
                  <Icon size={20} className="sm:hidden" />
                  <Icon size={26} className="hidden sm:block" />
                </div>
              </div>
            </div>

            {/* Mini Chart */}

            <div className="mt-5 flex h-10 items-end gap-1 sm:mt-8 sm:h-14 sm:gap-1.5">
              {[35, 70, 45, 82, 60, 95, 75].map(
                (height, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      height: 0,
                    }}
                    animate={{
                      height,
                    }}
                    transition={{
                      delay:
                        index * 0.08 + i * 0.05,
                    }}
                    className={`
                      flex-1

                      rounded-full

                      bg-linear-to-t
                      ${card.color}

                      opacity-70
                    `}
                  />
                )
              )}
            </div>

            {/* Footer */}

            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 sm:mt-6 sm:pt-5">
              <div
                className={`
                  flex
                  items-center
                  gap-1.5
                  text-xs
                  font-bold
                  sm:gap-2
                  sm:text-sm

                  ${
                    card.positive
                      ? "text-emerald-500"
                      : "text-red-500"
                  }
                `}
              >
                {card.positive ? (
                  <ArrowUpRight size={16} />
                ) : (
                  <ArrowDownRight size={16} />
                )}

                {card.change}
              </div>

              <span className="text-[10px] text-gray-400 sm:text-xs">
                نسبت به هفته گذشته
              </span>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}