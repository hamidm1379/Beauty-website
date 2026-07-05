"use client";

import { motion } from "framer-motion";
import {
  Package,
  CheckCircle2,
  AlertTriangle,
  FolderKanban,
} from "lucide-react";

interface ProductStatisticsProps {
  totalProducts?: number;
  activeProducts?: number;
  outOfStock?: number;
  categories?: number;
}

const statistics = ({
  totalProducts = 245,
  activeProducts = 221,
  outOfStock = 24,
  categories = 18,
}: ProductStatisticsProps) => [
  {
    title: "کل محصولات",
    value: totalProducts.toLocaleString("fa-IR"),
    icon: Package,
    color: "bg-pink-100 text-pink-600",
    badge: "همه محصولات",
  },
  {
    title: "محصولات فعال",
    value: activeProducts.toLocaleString("fa-IR"),
    icon: CheckCircle2,
    color: "bg-green-100 text-green-600",
    badge: "قابل فروش",
  },
  {
    title: "ناموجود",
    value: outOfStock.toLocaleString("fa-IR"),
    icon: AlertTriangle,
    color: "bg-orange-100 text-orange-600",
    badge: "نیاز به تامین",
  },
  {
    title: "دسته‌بندی‌ها",
    value: categories.toLocaleString("fa-IR"),
    icon: FolderKanban,
    color: "bg-sky-100 text-sky-600",
    badge: "فعال",
  },
];

export default function ProductStatistics(props: ProductStatisticsProps) {
  const cards = statistics(props);

  return (
    <section
      className="
        grid
        gap-5

        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
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
            }}
            whileHover={{
              y: -4,
            }}
            className="
              rounded-3xl

              border
              border-gray-100

              bg-white

              p-6

              shadow-sm

              transition-all
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h2
                  className="mt-3 text-3xl font-black text-gray-900"
                  suppressHydrationWarning
                >
                  {card.value}
                </h2>

                <span
                  className="
                    mt-4
                    inline-flex

                    rounded-full

                    bg-gray-100

                    px-3
                    py-1

                    text-xs
                    font-medium

                    text-gray-600
                  "
                >
                  {card.badge}
                </span>
              </div>

              <div
                className={`
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center

                  rounded-2xl

                  ${card.color}
                `}
              >
                <Icon size={26} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}