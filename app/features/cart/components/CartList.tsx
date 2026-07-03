"use client";

import { motion, AnimatePresence } from "framer-motion";
import CartItem from "./CartItem";

const products = [
  {
    id: 1,
    title: "کرم پودر دابل ور استی لادر",
    brand: "ESTEE LAUDER",
    image: "/products/product-1.png",
    color: "Beige Natural",
    price: 2450000,
    oldPrice: 2990000,
    quantity: 1,
  },
  {
    id: 2,
    title: "سرم هیالورونیک اسید اوردینری",
    brand: "The Ordinary",
    image: "/products/product-2.png",
    color: "30ml",
    price: 1180000,
    oldPrice: 1350000,
    quantity: 2,
  },
  {
    id: 3,
    title: "ضد آفتاب لاروش پوزای SPF50",
    brand: "La Roche Posay",
    image: "/products/product-3.png",
    color: "Invisible",
    price: 1650000,
    quantity: 1,
  },
];

export default function CartList() {
  return (
    <section className="space-y-6">
      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between

          rounded-3xl

          border
          border-gray-100

          bg-white

          px-6
          py-5

          shadow-sm
        "
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            محصولات سبد خرید
          </h2>

          <p className="mt-2 text-gray-500">
            {products.length} محصول در سبد خرید شما
          </p>
        </div>

        <div
          className="
            rounded-2xl

            bg-pink-50

            px-4
            py-2

            font-semibold

            text-pink-600
          "
        >
          {products.length} کالا
        </div>
      </div>

      {/* Items */}

      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className="space-y-6"
        >
          {products.map((product) => (
            <CartItem
              key={product.id}
              product={product}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}