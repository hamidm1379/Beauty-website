"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

import CartItem from "./CartItem";

import {
  increaseCartItemAction,
  decreaseCartItemAction,
  removeCartItemAction,
} from "@/app/features/cart/actions";

interface Props {
  items: {
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
      brand?: { id: number; title: string; slug: string; createdAt: Date; logo: string | null } | null;
      images: { id: number; image: string; productId: number; sortOrder: number }[];
    };
    variant?: { id: number; colorName: string; colorCode: string } | null;
  }[];
}

export default function CartList({ items: initialItems }: Props) {
  const [items, setItems] = useState(initialItems);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  async function increase(id: number) {
    setLoadingId(id);

    const result = await increaseCartItemAction(id);

    if (!result.success) {
      toast.error(result.error);
      setLoadingId(null);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );

    setLoadingId(null);
  }

  async function decrease(id: number) {
    setLoadingId(id);

    const result = await decreaseCartItemAction(id);

    if (!result.success) {
      toast.error(result.error);
      setLoadingId(null);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item
      )
    );

    setLoadingId(null);
  }

  async function remove(id: number) {
    setLoadingId(id);

    const result = await removeCartItemAction(id);

    if (!result.success) {
      toast.error(result.error);
      setLoadingId(null);
      return;
    }

    setItems((prev) => prev.filter((x) => x.id !== id));

    toast.success("محصول حذف شد");

    setLoadingId(null);
  }

  return (
    <section className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between gap-3 rounded-2xl sm:rounded-3xl border border-gray-100 bg-white px-4 py-4 sm:px-6 sm:py-5 shadow-sm">
        <div className="min-w-0">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
            محصولات سبد خرید
          </h2>

          <p className="mt-1 sm:mt-2 text-xs sm:text-base text-gray-500">
            {items.length} محصول در سبد خرید شما
          </p>
        </div>

        <div className="rounded-xl sm:rounded-2xl bg-pink-50 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-semibold text-pink-600">
          {items.length} کالا
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div layout className="space-y-4 sm:space-y-6">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              loading={loadingId === item.id}
              onIncrease={() => increase(item.id)}
              onDecrease={() => decrease(item.id)}
              onRemove={() => remove(item.id)}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}