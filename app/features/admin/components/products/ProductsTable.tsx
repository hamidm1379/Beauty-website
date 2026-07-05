"use client";

import { useState } from "react";
import {
  ChevronDown,
  ArrowUpDown,
} from "lucide-react";

import ProductRow from "./ProductRow";

const products = [
  {
    id: 1,
    image: "/images/product.jpg",
    title: "کرم آبرسان نوتروژینا",
    category: "مراقبت پوست",
    brand: "Neutrogena",
    price: 480000,
    stock: 18,
    status: "active",
  },
  {
    id: 2,
    image: "/images/product.jpg",
    title: "سرم ویتامین C",
    category: "مراقبت پوست",
    brand: "Ordinary",
    price: 690000,
    stock: 0,
    status: "inactive",
  },
  {
    id: 3,
    image: "/images/product.jpg",
    title: "رژ لب مات",
    category: "آرایش",
    brand: "Maybelline",
    price: 310000,
    stock: 12,
    status: "active",
  },
];

export default function ProductsTable() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const toggleProduct = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((item) => item.id));
    }
  };

  return (
    <section
      className="
        overflow-hidden

        rounded-4xl

        border
        border-gray-100

        bg-white

        shadow-sm
      "
    >
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr className="text-sm text-gray-600">
              <th className="w-14 px-5 py-4">
                <input
                  type="checkbox"
                  checked={
                    selectedProducts.length === products.length &&
                    products.length > 0
                  }
                  onChange={toggleAll}
                  className="h-5 w-5 rounded border-gray-300 accent-pink-500"
                />
              </th>

              <th className="px-5 py-4 text-right">
                محصول
              </th>

              <th className="px-5 py-4 text-right">
                دسته‌بندی
              </th>

              <th className="px-5 py-4 text-right">
                برند
              </th>

              <th className="px-5 py-4 text-right">
                <button className="flex items-center gap-2 font-semibold">
                  قیمت

                  <ArrowUpDown size={15} />
                </button>
              </th>

              <th className="px-5 py-4 text-right">
                موجودی
              </th>

              <th className="px-5 py-4 text-right">
                وضعیت
              </th>

              <th className="w-24 px-5 py-4 text-center">
                عملیات
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                checked={selectedProducts.includes(product.id)}
                onSelect={() => toggleProduct(product.id)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="
          flex
          items-center
          justify-between

          border-t
          border-gray-100

          bg-gray-50

          px-6
          py-4
        "
      >
        <p className="text-sm text-gray-500">
          نمایش
          <span className="mx-1 font-bold text-pink-600">
            {products.length.toLocaleString("fa-IR")}
          </span>
          محصول
        </p>

        <button
          className="
            flex
            items-center
            gap-2

            text-sm
            font-medium

            text-gray-500

            transition

            hover:text-pink-600
          "
        >
          مشاهده بیشتر

          <ChevronDown size={16} />
        </button>
      </div>
    </section>
  );
}