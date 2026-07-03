"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock3,
  Eye,
  Package,
  Truck,
} from "lucide-react";

const orders = [
  {
    id: "#845216",
    date: "۱۴۰۵/۰۴/۰۱",
    price: "۲,۸۵۰,۰۰۰",
    items: 3,
    status: "در حال ارسال",
    color: "blue",
    icon: Truck,
  },
  {
    id: "#845102",
    date: "۱۴۰۵/۰۳/۲۵",
    price: "۱,۴۲۰,۰۰۰",
    items: 2,
    status: "تحویل شده",
    color: "green",
    icon: CheckCircle2,
  },
  {
    id: "#844951",
    date: "۱۴۰۵/۰۳/۱۹",
    price: "۵۹۰,۰۰۰",
    items: 1,
    status: "در حال آماده سازی",
    color: "amber",
    icon: Clock3,
  },
];

export default function RecentOrders() {
  return (
    <section className="rounded-[34px] border border-gray-100 bg-white p-8 shadow-sm">
      {/* Header */}

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-600">
            سفارش‌ها
          </span>

          <h2 className="mt-4 text-3xl font-black text-gray-900">
            آخرین سفارش‌های شما
          </h2>

          <p className="mt-2 text-gray-500">
            وضعیت سفارش‌های اخیر خود را مشاهده کنید.
          </p>
        </div>

        <Link
          href="/account/orders"
          className="
            inline-flex
            items-center
            gap-2

            rounded-2xl

            bg-pink-500

            px-6
            py-3

            font-semibold

            text-white

            transition

            hover:bg-pink-600
          "
        >
          مشاهده همه

          <ArrowLeft size={18} />
        </Link>
      </div>

      {/* Orders */}

      <div className="space-y-5">
        {orders.map((order, index) => {
          const Icon = order.icon;

          return (
            <motion.div
              key={order.id}
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                y: -4,
              }}
              className="
                group

                rounded-[28px]

                border
                border-gray-100

                bg-gray-50

                p-6

                transition-all

                hover:border-pink-200
                hover:bg-white
                hover:shadow-lg
              "
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                {/* Left */}

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
                    "
                  >
                    <Package size={30} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      سفارش {order.id}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-5 text-sm text-gray-500">
                      <span className="flex items-center gap-2">
                        <Calendar size={15} />
                        {order.date}
                      </span>

                      <span>{order.items} کالا</span>
                    </div>
                  </div>
                </div>

                {/* Center */}

                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    مبلغ سفارش
                  </p>

                  <h4 className="mt-2 text-2xl font-black text-gray-900">
                    {order.price}
                  </h4>

                  <span className="text-sm text-gray-500">
                    تومان
                  </span>
                </div>

                {/* Right */}

                <div className="flex flex-col items-end gap-4">
                  <div
                    className={`
                      flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold

                      ${
                        order.color === "green"
                          ? "bg-green-100 text-green-600"
                          : order.color === "amber"
                          ? "bg-amber-100 text-amber-600"
                          : "bg-blue-100 text-blue-600"
                      }
                    `}
                  >
                    <Icon size={16} />

                    {order.status}
                  </div>

                  <button
                    className="
                      flex
                      items-center
                      gap-2

                      rounded-xl

                      border
                      border-gray-200

                      px-5
                      py-2.5

                      font-semibold

                      text-gray-700

                      transition

                      hover:border-pink-300
                      hover:text-pink-600
                    "
                  >
                    <Eye size={18} />

                    مشاهده جزئیات
                  </button>
                </div>
              </div>

              {/* Progress */}

              <div className="mt-6">
                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width:
                        order.color === "green"
                          ? "100%"
                          : order.color === "blue"
                          ? "70%"
                          : "35%",
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 1,
                    }}
                    className={`
                      h-full rounded-full

                      ${
                        order.color === "green"
                          ? "bg-green-500"
                          : order.color === "amber"
                          ? "bg-amber-500"
                          : "bg-blue-500"
                      }
                    `}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}