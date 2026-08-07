import Image from "next/image";
import { Package, Palette, Tag, ShoppingBag } from "lucide-react";

import type { AdminOrderItem } from "./types";

export default function OrderItems({ items }: { items: AdminOrderItem[] }) {
  return (
    <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-white p-4 sm:p-6">
      <div className="mb-4 sm:mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-pink-100 text-pink-500">
            <ShoppingBag className="h-4 w-4 sm:h-[22px] sm:w-[22px]" />
          </div>

          <div>
            <h3 className="text-sm sm:text-base font-black text-gray-900">محصولات سفارش</h3>

            <p className="text-xs sm:text-sm text-gray-500">
              {items.length.toLocaleString("fa-IR")} کالا
            </p>
          </div>
        </div>
      </div>

      {/* Desktop: card layout */}
      <div className="hidden space-y-5 sm:block">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* Mobile: compact list layout */}
      <div className="space-y-2.5 sm:hidden">
        {items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function ItemCard({ item }: { item: AdminOrderItem }) {
  return (
    <div className="flex gap-5 rounded-3xl border border-gray-100 bg-gray-50 p-5 transition hover:border-pink-200 hover:bg-white">
      {/* Image */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {item.productImage ? (
          <Image
            src={item.productImage}
            alt={item.productTitle}
            fill
            className="object-contain p-2"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-300">
            <Package className="h-[34px] w-[34px]" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <h4 className="text-lg font-bold text-gray-900">{item.productTitle}</h4>

          <div className="mt-3 flex flex-wrap gap-2">
            {item.variantTitle && (
              <span className="inline-flex items-center gap-1 rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600">
                <Tag className="h-3 w-3" />
                {item.variantTitle}
              </span>
            )}

            {item.variantColor && (
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                <span
                  className="h-3 w-3 rounded-full border"
                  style={{ backgroundColor: item.variantColor }}
                />
                <Palette className="h-3 w-3" />
                رنگ
              </span>
            )}

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700">
              تعداد {item.quantity.toLocaleString("fa-IR")}
            </span>

            {item.discount > 0 && (
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                {item.discount}% تخفیف
              </span>
            )}
          </div>
        </div>

        {/* Prices */}
        <div className="mt-5 grid grid-cols-3 gap-4 rounded-2xl bg-white p-4">
          <div>
            <p className="text-xs text-gray-500">قیمت واحد</p>
            <p className="mt-1 text-base font-bold text-gray-900">
              {item.unitPrice.toLocaleString("fa-IR")}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">تعداد</p>
            <p className="mt-1 text-base font-bold text-gray-900">
              {item.quantity.toLocaleString("fa-IR")}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">مبلغ نهایی</p>
            <p className="mt-1 text-lg font-black text-pink-600">
              {item.totalPrice.toLocaleString("fa-IR")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ItemRow({ item }: { item: AdminOrderItem }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-3">
      {/* Image */}
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white">
        {item.productImage ? (
          <Image
            src={item.productImage}
            alt={item.productTitle}
            fill
            className="object-contain p-1"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-300">
            <Package className="h-5 w-5" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="min-w-0">
          <h4 className="truncate text-sm font-bold text-gray-900">
            {item.productTitle}
          </h4>

          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {item.variantTitle && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-pink-50 px-1.5 py-0.5 text-[10px] font-semibold text-pink-600">
                {item.variantTitle}
              </span>
            )}
            <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] font-bold text-gray-700">
              ×{item.quantity.toLocaleString("fa-IR")}
            </span>
            {item.discount > 0 && (
              <span className="rounded-full bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-600">
                {item.discount}%
              </span>
            )}
          </div>
        </div>

        <p className="mt-1 text-sm font-black text-pink-600">
          {item.totalPrice.toLocaleString("fa-IR")}
          <span className="mr-0.5 text-[10px] font-normal text-gray-400">تومان</span>
        </p>
      </div>
    </div>
  );
}