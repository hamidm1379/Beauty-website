"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, Heart, ShieldCheck, ShieldAlert, Loader2 } from "lucide-react";

type Props = {
  item: {
    id: number;
    quantity: number;
    product: {
      id: number;
      title: string;
      thumbnail?: string | null;
      price: number;
      discountPrice?: number | null;
      stock: number;
      brand?: {
        title: string;
      } | null;
    };
    variant?: {
      id: number;
      colorName: string;
      colorCode: string;
    } | null;
  };

  loading?: boolean;

  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export default function CartItem({
  item,
  loading = false,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  const discount = item.product.discountPrice ?? 0;

  const hasDiscount = discount > 0 && discount < 100;

  const finalPrice = hasDiscount
    ? Math.round(item.product.price - (item.product.price * discount) / 100)
    : item.product.price;

  const totalPrice = finalPrice * item.quantity;

  const inStock = item.product.stock > 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm hover:shadow-xl sm:rounded-3xl sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row">
        {/* Image */}

        <div className="relative h-28 w-full rounded-2xl bg-gray-50 sm:h-40 sm:rounded-3xl lg:h-44 lg:w-44">
          <Image
            src={item.product.thumbnail ?? "/placeholder-product.png"}
            alt={item.product.title}
            fill
            className="object-contain p-3 sm:p-5"
          />
        </div>

        {/* Content */}

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <span className="rounded-full bg-pink-50 px-2.5 py-1 text-[11px] font-semibold text-pink-600 sm:px-3 sm:text-xs">
              {item.product.brand?.title ?? "بدون برند"}
            </span>

            <h2 className="mt-3 text-base font-bold text-gray-900 sm:mt-4 sm:text-xl">
              {item.product.title}
            </h2>
            {item.variant && (
              <div className="mt-2 flex items-center gap-2 sm:mt-3">
                <span
                  className="h-4 w-4 rounded-full border border-gray-200 sm:h-5 sm:w-5"
                  style={{ backgroundColor: item.variant.colorCode }}
                />
                <span className="text-xs text-gray-500 sm:text-sm">
                  رنگ: {item.variant.colorName}
                </span>
              </div>
            )}

            <div className={`mt-3 flex items-center gap-2 sm:mt-5 sm:gap-3 ${inStock ? "text-green-600" : "text-red-500"}`}>
              {inStock ? <ShieldCheck size={16} className="sm:hidden" /> : <ShieldAlert size={16} className="sm:hidden" />}
              {inStock ? <ShieldCheck size={18} className="hidden sm:block" /> : <ShieldAlert size={18} className="hidden sm:block" />}

              <span className="text-xs sm:text-sm">
                {inStock ? "موجود در انبار" : "ناموجود"}
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:mt-8 sm:gap-6 xl:flex-row xl:items-center xl:justify-between">
            {/* Quantity */}

            <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-200 sm:rounded-2xl">
              <button disabled={loading} onClick={onIncrease} className="cursor-pointer flex h-9 w-9 items-center justify-center hover:bg-pink-50 disabled:opacity-40 sm:h-12 sm:w-12">
                <Plus size={16} className="sm:hidden" />
                <Plus size={18} className="hidden sm:block" />
              </button>

              <span className="w-10 text-center text-sm font-bold sm:w-14 sm:text-base">
                {loading ? (
                  <Loader2 size={16} className="mx-auto animate-spin sm:hidden" />
                ) : (
                  item.quantity
                )}
                {loading && <Loader2 size={18} className="mx-auto hidden animate-spin sm:block" />}
              </span>

              <button disabled={loading} onClick={onDecrease} className="cursor-pointer flex h-9 w-9 items-center justify-center hover:bg-pink-50 disabled:opacity-40 sm:h-12 sm:w-12">
                <Minus size={16} className="sm:hidden" />
                <Minus size={18} className="hidden sm:block" />
              </button>
            </div>

            {/* Price */}

            <div className="text-center">
              {hasDiscount && (
                <p className="text-sm text-gray-400 line-through sm:text-base">
                  {(item.product.price * item.quantity).toLocaleString("fa-IR")}
                </p>
              )}

              <h3 className="text-lg font-black text-gray-900 sm:text-2xl">
                {totalPrice.toLocaleString("fa-IR")}

                <span className="mr-1.5 text-sm font-medium sm:mr-2 sm:text-base">تومان</span>
              </h3>
            </div>

            {/* Actions */}

            <div className="flex items-center gap-3">
              <button disabled={loading} onClick={onRemove} className="cursor-pointer flex items-center gap-1.5 rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white disabled:opacity-50 sm:gap-2 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-base">
                <Trash2 size={16} className="sm:hidden" />
                <Trash2 size={18} className="hidden sm:block" />
                حذف
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}