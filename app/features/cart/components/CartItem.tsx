"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, Heart, ShieldCheck, ShieldAlert, Loader2 } from "lucide-react";

type Props = {
  item: {
    id: number;
    quantity: number;
    product: {
      id: number;
      title: string;
      slug: string;
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
      className="rounded-2xl border border-gray-100 bg-white p-2.5 shadow-sm hover:shadow-xl sm:rounded-3xl sm:p-6"
    >
      <div className="flex flex-row gap-3 sm:gap-6">
        {/* Image */}

        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-50 sm:h-40 sm:w-40 sm:rounded-3xl lg:h-44 lg:w-44">
          <Image
            src={item.product.thumbnail ?? "/placeholder-product.png"}
            alt={item.product.title}
            fill
            quality={90}
            sizes="(max-width: 640px) 80px, (max-width: 1024px) 160px, 176px"
            className="object-contain p-0.5 sm:p-3"
          />
        </div>

        {/* Content */}

        <div className="flex flex-1 flex-col justify-between min-w-0">
          <div>
            <span className="rounded-full bg-pink-50 px-1.5 py-0.5 text-[9px] font-semibold text-pink-600 sm:px-3 sm:py-1 sm:text-xs">
              {item.product.brand?.title ?? "بدون برند"}
            </span>

            <Link
              href={`/products/${item.product.slug}`}
              className="mt-1 line-clamp-2 text-xs font-bold text-gray-900 hover:text-pink-600 transition-colors sm:mt-4 sm:line-clamp-none sm:text-xl"
            >
              {item.product.title}
            </Link>
            {item.variant && (
              <div className="mt-1 flex items-center gap-1 sm:mt-3 sm:gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full border border-gray-200 sm:h-5 sm:w-5"
                  style={{ backgroundColor: item.variant.colorCode }}
                />
                <span className="text-[10px] text-gray-500 sm:text-sm">
                  رنگ: {item.variant.colorName}
                </span>
              </div>
            )}

            {/* Stock status + Price */}
            <div className="mt-1 flex items-center justify-between gap-2 sm:mt-5">
              <div className={`flex items-center gap-1 sm:gap-3 ${inStock ? "text-green-600" : "text-red-500"}`}>
                {inStock ? <ShieldCheck size={12} className="sm:hidden" /> : <ShieldAlert size={12} className="sm:hidden" />}
                {inStock ? <ShieldCheck size={18} className="hidden sm:block" /> : <ShieldAlert size={18} className="hidden sm:block" />}

                <span className="text-[10px] sm:text-sm">
                  {inStock ? "موجود در انبار" : "ناموجود"}
                </span>
              </div>

              <div className="text-left">
                {hasDiscount && (
                  <p className="truncate text-[9px] text-gray-400 line-through sm:text-sm">
                    {(item.product.price * item.quantity).toLocaleString("fa-IR")}
                  </p>
                )}

                <h3 className="truncate text-[11px] font-black text-gray-900 sm:text-lg">
                  {totalPrice.toLocaleString("fa-IR")}
                  <span className="mr-1 text-[9px] font-medium sm:mr-1.5 sm:text-xs">تومان</span>
                </h3>
              </div>
            </div>
          </div>

          <div className="mt-2.5 flex flex-row flex-nowrap items-center justify-between gap-1.5 sm:mt-6 sm:gap-6">
            {/* Quantity */}

            <div className="flex w-fit shrink-0 items-center overflow-hidden rounded-lg border border-gray-200 sm:rounded-2xl">
              <button disabled={loading} onClick={onIncrease} className="cursor-pointer flex h-6 w-6 items-center justify-center hover:bg-pink-50 disabled:opacity-40 sm:h-12 sm:w-12">
                <Plus size={12} className="sm:hidden" />
                <Plus size={18} className="hidden sm:block" />
              </button>

              <span className="w-5 text-center text-[11px] font-bold sm:w-14 sm:text-base">
                {loading ? (
                  <Loader2 size={12} className="mx-auto animate-spin sm:hidden" />
                ) : (
                  item.quantity
                )}
                {loading && <Loader2 size={18} className="mx-auto hidden animate-spin sm:block" />}
              </span>

              <button disabled={loading} onClick={onDecrease} className="cursor-pointer flex h-6 w-6 items-center justify-center hover:bg-pink-50 disabled:opacity-40 sm:h-12 sm:w-12">
                <Minus size={12} className="sm:hidden" />
                <Minus size={18} className="hidden sm:block" />
              </button>
            </div>

            {/* Actions */}

            <div className="flex shrink-0 items-center gap-3">
              <button disabled={loading} onClick={onRemove} className="cursor-pointer flex items-center gap-1 rounded-lg bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-500 transition hover:bg-red-500 hover:text-white disabled:opacity-50 sm:gap-2 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-base">
                <Trash2 size={12} className="sm:hidden" />
                <Trash2 size={18} className="hidden sm:block" />
                <span>حذف</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}