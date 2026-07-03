"use client";

export interface Product {
  id: string;
  title: string;
  slug: string;

  image: string;

  brand: string;

  price: number;

  oldPrice?: number;

  discount?: number;
}

import Image from "next/image";
import { ShoppingCart } from "lucide-react";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div
      className="
      group
      overflow-hidden
      rounded-2xl
      md:rounded-3xl
      border
      border-gray-100
      bg-white
      transition-all
      hover:shadow-lg
      cursor-pointer
    "
    >
      <div className="relative aspect-square overflow-hidden">
        {product.discount && (
          <span
            className="
            absolute
            left-3
            top-3
            z-10
            rounded-md
            bg-pink-500
            px-1.5
            py-0.5
            md:px-3
            md:py-1
            text-[10px]
            md:text-[13px]
            text-white
          "
          >
            {product.discount} %
          </span>
        )}

        <Image
          src={product.image}
          alt={product.title}
          fill
          className="
            object-contain
            p-6
            transition
            duration-300
            group-hover:scale-105
          "
        />
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 text-[14px] md:text-[16px] font-medium">{product.title}</h3>

        <p className="mt-0.5 md:mt-2 text-gray-500 text-[12px] md:text-[14px]">{product.brand}</p>

        <div className="mt-4">
          <div className="flex max-md:flex-col-reverse items-center gap-2">
            <p className="font-bold text-[12px] md:text-[15px]">
              {product.price.toLocaleString()} تومان
            </p>

            {product.oldPrice && (
              <p
                className="
                text-gray-400
                line-through
                text-[10px]
                md:text-sm
              "
              >
                  {product.oldPrice.toLocaleString()}
              </p>
            )}
          </div>

          <button
            className="
            rounded-xl
            bg-pink-500
            p-1.5
            md:p-2.5
            text-white
            cursor-pointer
            hover:bg-pink-700
            duration-500
            float-left
            my-2
            md:my-4
          "
          >
            <ShoppingCart className="w-5 h-5 md:w-5.5 md:h-5.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
