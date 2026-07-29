import Image from "next/image";
import { Package, Palette, Tag, ShoppingBag } from "lucide-react";

import type { AdminOrderItem } from "./types";

export default function OrderItems({ items }: { items: AdminOrderItem[] }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-500">
            <ShoppingBag size={22} />
          </div>

          <div>
            <h3 className="font-black text-gray-900">محصولات سفارش</h3>

            <p className="text-sm text-gray-500">
              {items.length.toLocaleString("fa-IR")} کالا
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="
              flex
              gap-5

              rounded-3xl

              border
              border-gray-100

              bg-gray-50

              p-5

              transition

              hover:border-pink-200
              hover:bg-white
            "
          >
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
                  <Package size={34} />
                </div>
              )}
            </div>

            {/* Info */}

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold text-gray-900">
                  {item.productTitle}
                </h4>

                <div className="mt-3 flex flex-wrap gap-2">
                  {item.variantTitle && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600">
                      <Tag size={12} />
                      {item.variantTitle}
                    </span>
                  )}

                  {item.variantColor && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                      <span
                        className="h-3 w-3 rounded-full border"
                        style={{
                          backgroundColor: item.variantColor,
                        }}
                      />
                      <Palette size={12} />
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

                  <p className="mt-1 font-bold text-gray-900">
                    {item.unitPrice.toLocaleString("fa-IR")}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">تعداد</p>

                  <p className="mt-1 font-bold text-gray-900">
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
        ))}
      </div>
    </div>
  );
}
