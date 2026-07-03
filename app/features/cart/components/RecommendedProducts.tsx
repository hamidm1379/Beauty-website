"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import ProductCard, {
  Product,
} from "@/app/features/home/components/ProductCard";

const products: Product[] = [
  {
    id: "1",
    slug: "estee-lauder-foundation",
    title: "کرم پودر دابل ور استی لادر",
    brand: "ESTEE LAUDER",
    image: "/products/product-1.png",
    price: 2450000,
    oldPrice: 2990000,
    discount: 18,
  },
  {
    id: "2",
    slug: "cerave-cleanser",
    title: "ژل شستشوی سراوی",
    brand: "CeraVe",
    image: "/products/product-2.png",
    price: 980000,
    oldPrice: 1190000,
    discount: 15,
  },
  {
    id: "3",
    slug: "ordinary-serum",
    title: "سرم هیالورونیک اسید اوردینری",
    brand: "The Ordinary",
    image: "/products/product-3.png",
    price: 1280000,
    oldPrice: 1490000,
    discount: 14,
  },
  {
    id: "4",
    slug: "laroche-spf50",
    title: "ضد آفتاب لاروش پوزای SPF50",
    brand: "La Roche Posay",
    image: "/products/product-4.png",
    price: 1650000,
    oldPrice: 1890000,
    discount: 12,
  },
];

export default function RecommendedProducts() {
  return (
    <section>
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <span
            className="
              rounded-full
              bg-pink-100
              px-4
              py-2
              text-sm
              font-semibold
              text-pink-600
            "
          >
            پیشنهاد ویژه
          </span>

          <h2
            className="
              mt-4
              text-4xl
              font-black
              text-gray-900
            "
          >
            شاید این محصولات را هم دوست داشته باشید
          </h2>

          <p className="mt-3 text-gray-500">
            بر اساس محصولات موجود در سبد خرید شما
          </p>
        </div>

        <Link
          href="/products"
          className="
            hidden
            rounded-2xl
            border
            border-pink-200
            px-6
            py-3
            font-semibold
            text-pink-600
            transition
            hover:bg-pink-500
            hover:text-white
            lg:block
          "
        >
          مشاهده همه
        </Link>
      </div>

      {/* Products */}

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},

          show: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="
          grid
          gap-6

          grid-cols-2

          lg:grid-cols-4
        "
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={{
              hidden: {
                opacity: 0,
                y: 30,
              },

              show: {
                opacity: 1,
                y: 0,
              },
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile Button */}

      <div className="mt-8 lg:hidden">
        <Link
          href="/products"
          className="
            flex
            h-12
            items-center
            justify-center

            rounded-2xl

            border
            border-pink-300

            font-semibold

            text-pink-600

            transition

            hover:bg-pink-500
            hover:text-white
          "
        >
          مشاهده همه محصولات
        </Link>
      </div>
    </section>
  );
}