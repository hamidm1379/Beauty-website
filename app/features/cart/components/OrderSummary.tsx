"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TicketPercent,
  CreditCard,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

interface CartItem {
  quantity: number;

  product: {
    price: number;
    discountPrice: number | null;
  };
}

interface Props {
  items: CartItem[];
}

export default function OrderSummary({ items }: Props) {
  const [coupon, setCoupon] = useState("");

  const { subtotal, discount, shipping, total } = useMemo(() => {
    let subtotal = 0;
    let discount = 0;

    items.forEach((item) => {
      const price = item.product.price;

      subtotal += price * item.quantity;

      if (item.product.discountPrice) {
        const final =
          price -
          (price * item.product.discountPrice) / 100;

        discount += (price - final) * item.quantity;
      }
    });

    const shipping = subtotal > 0 ? 0 : 0;

    return {
      subtotal,
      discount,
      shipping,
      total: subtotal - discount + shipping,
    };
  }, [items]);

  return (
    <motion.aside
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-4xl border border-gray-100 bg-white p-7 shadow-xl"
    >
      <h2 className="text-2xl font-black text-gray-900">
        خلاصه سفارش
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        اطلاعات نهایی سفارش شما
      </p>

      <div className="mt-8 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">
            مبلغ کالا
          </span>

          <span className="font-semibold">
            {subtotal.toLocaleString("fa-IR")} تومان
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">
            تخفیف
          </span>

          <span className="font-semibold text-green-600">
            - {discount.toLocaleString("fa-IR")} تومان
          </span>
        </div>

        {/* <div className="flex items-center justify-between">
          <span className="text-gray-500">
            هزینه ارسال
          </span>

          <span className="font-semibold text-pink-500">
            با توجه به مکان انتخابی شما محاسبه میشود
          </span>
        </div> */}
      </div>

      <div className="my-7 border-t border-dashed border-gray-200" />

      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">
          جمع کل
        </span>

        <span className="text-3xl font-black text-pink-600">
          {total.toLocaleString("fa-IR")}
        </span>
      </div>

      <p className="mt-1 text-left text-sm text-gray-500">
        تومان
      </p>

      <div className="mt-10">
        <label className="mb-3 flex items-center gap-2 font-semibold">
          <TicketPercent
            size={18}
            className="text-pink-500"
          />
          کد تخفیف
        </label>

        <div className="flex gap-3">
          <input
            value={coupon}
            onChange={(e) =>
              setCoupon(e.target.value)
            }
            placeholder="کد تخفیف..."
            className="h-12 flex-1 rounded-2xl border border-gray-200 px-4 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
          />

          <button className="cursor-pointer rounded-2xl bg-pink-100 px-5 font-semibold text-pink-600 transition hover:bg-pink-500 hover:text-white">
            اعمال
          </button>
        </div>
      </div>

      <Link href="/checkout">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!items.length}
          className="mt-10 flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-pink-500 to-rose-500 py-4 text-lg font-bold text-white shadow-lg transition-all hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CreditCard size={22} />
          ادامه فرآیند خرید
          <ArrowLeft size={20} />
        </motion.button>
      </Link>

      <div className="mt-8 rounded-2xl bg-pink-50 p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck
            size={24}
            className="mt-1 text-pink-500"
          />

          <div>
            <h3 className="font-bold text-gray-900">
              پرداخت کاملاً امن
            </h3>

            <p className="mt-2 text-sm leading-7 text-gray-500">
              اطلاعات پرداخت شما با استفاده از پروتکل‌های امنیتی
              رمزنگاری شده و محفوظ خواهد ماند.
            </p>
          </div>
        </div>
      </div>

      {/* <div className="mt-8 space-y-4">
        {[
          "ارسال سریع به سراسر کشور",
          "ضمانت اصالت تمامی محصولات",
          "۷ روز ضمانت بازگشت کالا",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-3"
          >
            <span className="h-2 w-2 rounded-full bg-pink-500" />

            <span className="text-sm text-gray-600">
              {item}
            </span>
          </div>
        ))}
      </div> */}
    </motion.aside>
  );
}