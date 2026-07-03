"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShoppingBag,
  Tag,
  Truck,
  ShieldCheck,
  CreditCard,
  ArrowLeft,
} from "lucide-react";

export default function OrderSummary() {
  const subtotal = 2850000;
  const shipping = 0;
  const discount = 180000;
  const total = subtotal + shipping - discount;

  const formatPrice = (price: number) =>
    price.toLocaleString("fa-IR");

  return (
    <motion.aside
      initial={{
        opacity: 0,
        x: 30,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        sticky
        top-6

        overflow-hidden

        rounded-4xl

        border
        border-gray-100

        bg-white

        shadow-xl
        shadow-pink-100/30
      "
    >
      {/* Header */}

      <div className="relative overflow-hidden bg-linear-to-r from-pink-500 via-rose-500 to-fuchsia-500 p-6 text-white">
        <div className="absolute -left-12 -top-12 h-36 w-36 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex items-center gap-4">
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center

              rounded-2xl

              bg-white/15

              backdrop-blur
            "
          >
            <ShoppingBag size={28} />
          </div>

          <div>
            <h2 className="text-2xl font-black">
              خلاصه سفارش
            </h2>

            <p className="mt-1 text-pink-100">
              بررسی مبلغ قابل پرداخت
            </p>
          </div>
        </div>
      </div>

      {/* Body */}

      <div className="space-y-6 p-6">
        {/* Price */}

        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">
              مجموع خرید
            </span>

            <span className="font-bold text-gray-900">
              {formatPrice(subtotal)} تومان
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-gray-500">
              <Truck size={16} />

              هزینه ارسال
            </span>

            <span className="font-bold text-green-600">
              رایگان
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-gray-500">
              <Tag size={16} />

              تخفیف
            </span>

            <span className="font-bold text-pink-500">
              - {formatPrice(discount)}
            </span>
          </div>

          <div className="border-t border-dashed border-gray-200 pt-5">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">
                مبلغ نهایی
              </span>

              <span className="text-2xl font-black text-pink-600">
                {formatPrice(total)}
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              تومان
            </p>
          </div>
        </div>

        {/* Benefits */}

        <div className="space-y-3 rounded-3xl bg-pink-50 p-5">
          <div className="flex items-center gap-3">
            <ShieldCheck
              size={20}
              className="text-pink-500"
            />

            <span className="text-sm font-semibold text-gray-700">
              تضمین اصالت کالا
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Truck
              size={20}
              className="text-pink-500"
            />

            <span className="text-sm font-semibold text-gray-700">
              ارسال سریع و ایمن
            </span>
          </div>

          <div className="flex items-center gap-3">
            <CreditCard
              size={20}
              className="text-pink-500"
            />

            <span className="text-sm font-semibold text-gray-700">
              پرداخت امن بانکی
            </span>
          </div>
        </div>

        {/* Button */}

        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
        >
          <Link
            href="/checkout/payment"
            className="
              flex
              items-center
              justify-center
              gap-3

              rounded-2xl

              bg-linear-to-r
              from-pink-500
              via-rose-500
              to-fuchsia-500

              px-6
              py-4

              font-bold

              text-white

              shadow-lg
              shadow-pink-300/40

              transition
            "
          >
            ادامه به پرداخت

            <ArrowLeft size={18} />
          </Link>
        </motion.div>

        {/* Security */}

        <div
          className="
            rounded-2xl

            border
            border-green-100

            bg-green-50

            p-4

            text-center
          "
        >
          <p className="text-sm leading-7 text-green-700">
            🔒 اطلاعات شما با استفاده از پروتکل SSL رمزنگاری شده و
            کاملاً ایمن است.
          </p>
        </div>
      </div>
    </motion.aside>
  );
}