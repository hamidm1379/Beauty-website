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

      <div className="space-y-3 sm:space-y-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 sm:gap-5 rounded-2xl sm:rounded-3xl border border-gray-100 bg-gray-50 p-3 sm:p-5 transition hover:border-pink-200 hover:bg-white"
          >
            {/* Image */}

            <div className="relative h-16 w-16 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 bg-white">
              {item.productImage ? (
                <Image
                  src={item.productImage}
                  alt={item.productTitle}
                  fill
                  className="object-contain p-1.5 sm:p-2"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-300">
                  <Package className="h-6 w-6 sm:h-[34px] sm:w-[34px]" />
                </div>
              )}
            </div>

            {/* Info */}

            <div className="flex min-w-0 flex-1 flex-col justify-between">
              <div>
                <h4 className="text-sm sm:text-lg font-bold text-gray-900">
                  {item.productTitle}
                </h4>

                <div className="mt-2 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                  {item.variantTitle && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-pink-50 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold text-pink-600">
                      <Tag className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      {item.variantTitle}
                    </span>
                  )}

                  {item.variantColor && (
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-blue-50 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold text-blue-600">
                      <span
                        className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border"
                        style={{
                          backgroundColor: item.variantColor,
                        }}
                      />
                      <Palette className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      رنگ
                    </span>
                  )}

                  <span className="rounded-full bg-gray-100 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold text-gray-700">
                    تعداد {item.quantity.toLocaleString("fa-IR")}
                  </span>

                  {item.discount > 0 && (
                    <span className="rounded-full bg-red-100 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold text-red-600">
                      {item.discount}% تخفیف
                    </span>
                  )}
                </div>
              </div>

              {/* Prices */}

              <div className="mt-3 sm:mt-5 grid grid-cols-3 gap-2 sm:gap-4 rounded-xl sm:rounded-2xl bg-white p-2.5 sm:p-4">
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500">قیمت واحد</p>

                  <p className="mt-1 text-xs sm:text-base font-bold text-gray-900">
                    {item.unitPrice.toLocaleString("fa-IR")}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500">تعداد</p>

                  <p className="mt-1 text-xs sm:text-base font-bold text-gray-900">
                    {item.quantity.toLocaleString("fa-IR")}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500">مبلغ نهایی</p>

                  <p className="mt-1 text-sm sm:text-lg font-black text-pink-600">
                    {item.totalPrice.toLocaleString("fa-IR")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}