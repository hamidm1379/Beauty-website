"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Zap,
  Store,
  CheckCircle2,
  Clock3,
  Wallet,
} from "lucide-react";

const methods = [
  {
    id: "normal",
    icon: Truck,
    title: "ارسال عادی",
    subtitle: "۲ تا ۴ روز کاری",
    price: "۶۰,۰۰۰ تومان",
    color: "bg-blue-50 text-blue-600",
    description:
      "ارسال استاندارد به سراسر کشور با بسته‌بندی ایمن.",
  },
  {
    id: "express",
    icon: Zap,
    title: "ارسال فوری",
    subtitle: "تحویل امروز",
    price: "۱۵۰,۰۰۰ تومان",
    color: "bg-pink-50 text-pink-600",
    description:
      "ویژه شهرهای منتخب، تحویل در همان روز سفارش.",
  },
  {
    id: "pickup",
    icon: Store,
    title: "دریافت حضوری",
    subtitle: "بدون هزینه",
    price: "رایگان",
    color: "bg-green-50 text-green-600",
    description:
      "تحویل سفارش از فروشگاه در ساعت کاری.",
  },
];

export default function ShippingMethod() {
  const [selected, setSelected] = useState("normal");

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      className="
        rounded-4xl
        border
        border-gray-100
        bg-white
        p-8
        shadow-sm
      "
    >
      {/* Header */}

      <div className="mb-8 flex items-center gap-4">
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-pink-100
            text-pink-500
          "
        >
          <Truck size={28} />
        </div>

        <div>
          <h2 className="text-2xl font-black text-gray-900">
            روش ارسال
          </h2>

          <p className="mt-1 text-gray-500">
            یکی از روش‌های ارسال را انتخاب کنید.
          </p>
        </div>
      </div>

      {/* Cards */}

      <div className="space-y-5">
        {methods.map((item) => {
          const Icon = item.icon;

          const active = selected === item.id;

          return (
            <motion.button
              key={item.id}
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => setSelected(item.id)}
              className={`
                relative
                w-full
                overflow-hidden
                rounded-3xl
                border
                p-6
                text-right
                transition-all
                duration-300

                ${
                  active
                    ? "border-pink-500 bg-pink-50 shadow-lg shadow-pink-100"
                    : "border-gray-100 bg-white hover:border-pink-200 hover:shadow-md"
                }
              `}
            >
              {active && (
                <motion.div
                  layoutId="selectedShipping"
                  className="absolute inset-0 rounded-3xl border-2 border-pink-500"
                />
              )}

              <div className="relative flex items-start justify-between">
                <div className="flex gap-5">
                  <div
                    className={`
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      ${item.color}
                    `}
                  >
                    <Icon size={26} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {item.title}
                      </h3>

                      {active && (
                        <CheckCircle2
                          size={18}
                          className="text-pink-500"
                        />
                      )}
                    </div>

                    <div className="mt-2 flex items-center gap-5 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock3 size={15} />
                        {item.subtitle}
                      </span>

                      <span className="flex items-center gap-1">
                        <Wallet size={15} />
                        {item.price}
                      </span>
                    </div>

                    <p className="mt-4 leading-7 text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Radio */}

                <div
                  className={`
                    mt-1
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    transition-all

                    ${
                      active
                        ? "border-pink-500"
                        : "border-gray-300"
                    }
                  `}
                >
                  {active && (
                    <motion.div
                      layoutId="radio"
                      className="
                        h-3
                        w-3
                        rounded-full
                        bg-pink-500
                      "
                    />
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Notice */}

      <div
        className="
          mt-8
          rounded-2xl
          border
          border-amber-100
          bg-amber-50
          p-5
        "
      >
        <p className="text-sm leading-7 text-amber-700">
          ⏰ سفارش‌هایی که قبل از ساعت <strong>۱۵:۰۰</strong> ثبت شوند،
          در همان روز پردازش خواهند شد.
        </p>
      </div>
    </motion.section>
  );
}