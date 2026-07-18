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
      className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-xl"
    >
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Image */}

        <div className="relative h-40 w-full rounded-3xl bg-gray-50 lg:h-44 lg:w-44">
          <Image
            src={item.product.thumbnail ?? "/placeholder-product.png"}
            alt={item.product.title}
            fill
            className="object-contain p-5"
          />
        </div>

        {/* Content */}

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600">
              {item.product.brand?.title ?? "بدون برند"}
            </span>

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              {item.product.title}
            </h2>
            {item.variant && (
              <div className="mt-3 flex items-center gap-2">
                <span
                  className="h-5 w-5 rounded-full border border-gray-200"
                  style={{ backgroundColor: item.variant.colorCode }}
                />
                <span className="text-sm text-gray-500">
                  رنگ: {item.variant.colorName}
                </span>
              </div>
            )}

            <div
              className={`mt-5 flex items-center gap-3 ${
                inStock ? "text-green-600" : "text-red-500"
              }`}
            >
              {inStock ? (
                <ShieldCheck size={18} />
              ) : (
                <ShieldAlert size={18} />
              )}

              <span className="text-sm">
                {inStock ? "موجود در انبار" : "ناموجود"}
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            {/* Quantity */}

            <div className="flex w-fit items-center overflow-hidden rounded-2xl border border-gray-200">
              <button
                disabled={loading}
                onClick={onIncrease}
                className="cursor-pointer flex h-12 w-12 items-center justify-center hover:bg-pink-50 disabled:opacity-40"
              >
                <Plus size={18} />
              </button>

              <span className="w-14 text-center font-bold">
                {loading ? (
                  <Loader2 size={18} className="mx-auto animate-spin" />
                ) : (
                  item.quantity
                )}
              </span>

              <button
                disabled={loading}
                onClick={onDecrease}
                className="cursor-pointer flex h-12 w-12 items-center justify-center hover:bg-pink-50 disabled:opacity-40"
              >
                <Minus size={18} />
              </button>
            </div>

            {/* Price */}

            <div className="text-center">
              {/* <p className="mb-1 text-xs text-gray-400">
                قیمت واحد: {finalPrice.toLocaleString("fa-IR")} تومان
              </p> */}

              {hasDiscount && (
                <p className="text-gray-400 line-through">
                  {(item.product.price * item.quantity).toLocaleString("fa-IR")}
                </p>
              )}

              <h3 className="text-2xl font-black text-gray-900">
                {totalPrice.toLocaleString("fa-IR")}

                <span className="mr-2 text-base font-medium">تومان</span>
              </h3>
            </div>

            {/* Actions */}

            <div className="flex items-center gap-3">
              {/* <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 hover:border-pink-300 hover:bg-pink-50">
                <Heart size={20} />
              </button> */}

              <button
                disabled={loading}
                onClick={onRemove}
                className="cursor-pointer flex items-center gap-2 rounded-2xl bg-red-50 px-5 py-3 font-semibold text-red-500 transition hover:bg-red-500 hover:text-white disabled:opacity-50"
              >
                <Trash2 size={18} />
                حذف
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}