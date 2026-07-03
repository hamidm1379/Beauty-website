"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TicketPercent,
  CheckCircle2,
  Sparkles,
  Gift,
} from "lucide-react";

export default function CouponBox() {
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    if (coupon.trim()) {
      setApplied(true);
    }
  };

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
        relative
        overflow-hidden

        rounded-4xl

        border
        border-gray-100

        bg-white

        p-8

        shadow-sm
      "
    >
      {/* Background */}

      <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-pink-100 blur-3xl" />

      <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-rose-100 blur-3xl" />

      <div className="relative">
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
            <TicketPercent size={28} />
          </div>

          <div>
            <h2 className="text-2xl font-black text-gray-900">
              کد تخفیف
            </h2>

            <p className="mt-1 text-gray-500">
              اگر کد تخفیف دارید اینجا وارد کنید.
            </p>
          </div>
        </div>

        {/* Coupon */}

        <div className="flex flex-col gap-4 md:flex-row">
          <input
            value={coupon}
            onChange={(e) =>
              setCoupon(e.target.value)
            }
            placeholder="مثلاً : BEAUTY20"
            className="
              h-14
              flex-1

              rounded-2xl

              border
              border-gray-200

              px-5

              outline-none

              transition-all

              placeholder:text-gray-400

              focus:border-pink-400
              focus:ring-4
              focus:ring-pink-100
            "
          />

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={handleApply}
            className="
              h-14

              rounded-2xl

              bg-linear-to-r
              from-pink-500
              to-rose-500

              px-8

              font-bold

              text-white

              shadow-lg
              shadow-pink-200

              transition-all

              hover:shadow-xl
            "
          >
            اعمال کد
          </motion.button>
        </div>

        {/* Success */}

        {applied && (
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              mt-6

              flex
              items-center
              gap-3

              rounded-2xl

              border
              border-green-200

              bg-green-50

              p-4
            "
          >
            <CheckCircle2
              size={22}
              className="text-green-600"
            />

            <p className="font-medium text-green-700">
              کد تخفیف با موفقیت اعمال شد.
            </p>
          </motion.div>
        )}

        {/* Suggestions */}

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <motion.div
            whileHover={{
              y: -4,
            }}
            className="
              rounded-3xl

              border
              border-pink-100

              bg-pink-50

              p-5
            "
          >
            <div className="flex items-center gap-3">
              <Sparkles className="text-pink-500" />

              <h3 className="font-bold text-gray-900">
                پیشنهاد ویژه
              </h3>
            </div>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              با خرید بالای
              <span className="mx-1 font-bold text-pink-600">
                ۳ میلیون تومان
              </span>
              ارسال سفارش شما رایگان خواهد بود.
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              y: -4,
            }}
            className="
              rounded-3xl

              border
              border-amber-100

              bg-amber-50

              p-5
            "
          >
            <div className="flex items-center gap-3">
              <Gift className="text-amber-500" />

              <h3 className="font-bold text-gray-900">
                هدیه خرید
              </h3>
            </div>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              خریدهای بالای
              <span className="mx-1 font-bold text-amber-600">
                ۵ میلیون تومان
              </span>
              شامل هدیه ویژه و بسته‌بندی لوکس خواهند بود.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}