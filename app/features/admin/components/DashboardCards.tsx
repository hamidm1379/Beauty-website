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
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
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

              rounded-4xl

              border
              border-gray-100

              bg-white

              p-6

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
                <p className="text-sm font-medium text-gray-500">
                  {card.title}
                </p>

                <h3 className="mt-3 text-3xl font-black text-gray-900">
                  {card.value}
                </h3>

                <span className="mt-1 block text-sm text-gray-400">
                  {card.suffix}
                </span>
              </div>

              <div
                className={`
                  flex
                  h-16
                  w-16

                  items-center
                  justify-center

                  rounded-3xl

                  ${card.bg}
                `}
              >
                <div
                  className={`
                    flex
                    h-12
                    w-12

                    items-center
                    justify-center

                    rounded-2xl

                    bg-linear-to-br
                    ${card.color}

                    text-white

                    shadow-lg
                  `}
                >
                  <Icon size={26} />
                </div>
              </div>
            </div>

            {/* Mini Chart */}

            <div className="mt-8 flex h-14 items-end gap-1.5">
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

            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
              <div
                className={`
                  flex
                  items-center
                  gap-2

                  text-sm
                  font-bold

                  ${
                    card.positive
                      ? "text-emerald-500"
                      : "text-red-500"
                  }
                `}
              >
                {card.positive ? (
                  <ArrowUpRight size={18} />
                ) : (
                  <ArrowDownRight size={18} />
                )}

                {card.change}
              </div>

              <span className="text-xs text-gray-400">
                نسبت به هفته گذشته
              </span>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}