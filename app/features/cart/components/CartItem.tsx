"use client";

import { useState } from "react";

import Image from "next/image";

import { motion } from "framer-motion";

import {
  Minus,
  Plus,
  Trash2,
  Heart,
  ShieldCheck,
} from "lucide-react";

type Props = {
  product: {
    id: number;
    title: string;
    brand: string;
    image: string;
    color: string;
    price: number;
    oldPrice?: number;
    quantity: number;
  };
};

export default function CartItem({ product }: Props) {
  const [quantity, setQuantity] = useState(product.quantity);

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -3,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
        rounded-[30px]

        border
        border-gray-100

        bg-white

        p-6

        shadow-sm

        transition-all

        hover:shadow-xl
      "
    >
      <div
        className="
          flex
          flex-col

          gap-6

          lg:flex-row
        "
      >
        {/* Product Image */}

        <div
          className="
            relative

            flex

            h-44
            w-full

            items-center
            justify-center

            rounded-3xl

            bg-gray-50

            lg:h-44
            lg:w-44
          "
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-6"
          />
        </div>

        {/* Info */}

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <span
              className="
                rounded-full

                bg-pink-50

                px-3
                py-1

                text-xs
                font-semibold

                text-pink-600
              "
            >
              {product.brand}
            </span>

            <h2
              className="
                mt-4

                text-2xl
                font-bold

                text-gray-900
              "
            >
              {product.title}
            </h2>

            <div
              className="
                mt-5

                flex
                flex-wrap

                items-center

                gap-4
              "
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-500">
                  رنگ:
                </span>

                <span className="font-semibold">
                  {product.color}
                </span>
              </div>

              <div className="flex items-center gap-2 text-green-600">
                <ShieldCheck size={18} />

                <span className="text-sm font-medium">
                  موجود در انبار
                </span>
              </div>
            </div>
          </div>

          {/* Bottom */}

          <div
            className="
              mt-8

              flex

              flex-col

              gap-6

              xl:flex-row
              xl:items-center
              xl:justify-between
            "
          >
            {/* Quantity */}

            <div
              className="
                flex

                w-fit

                items-center

                overflow-hidden

                rounded-2xl

                border
                border-gray-200
              "
            >
              <button
                onClick={increase}
                className="
                  flex

                  h-12
                  w-12

                  items-center
                  justify-center

                  transition

                  hover:bg-pink-50
                "
              >
                <Plus size={18} />
              </button>

              <motion.span
                key={quantity}
                initial={{
                  scale: 0.8,
                }}
                animate={{
                  scale: 1,
                }}
                className="
                  w-14

                  text-center

                  font-bold
                "
              >
                {quantity}
              </motion.span>

              <button
                onClick={decrease}
                className="
                  flex

                  h-12
                  w-12

                  items-center
                  justify-center

                  transition

                  hover:bg-pink-50
                "
              >
                <Minus size={18} />
              </button>
            </div>

            {/* Price */}

            <div className="text-center">
              {product.oldPrice && (
                <p className="text-gray-400 line-through">
                  {product.oldPrice.toLocaleString()}
                </p>
              )}

              <h3
                className="
                  mt-1

                  text-2xl
                  font-black

                  text-gray-900
                "
              >
                {product.price.toLocaleString()}

                <span className="mr-2 text-base font-medium">
                  تومان
                </span>
              </h3>
            </div>

            {/* Actions */}

            <div className="flex items-center gap-3">
              <button
                className="
                  flex

                  h-12
                  w-12

                  items-center
                  justify-center

                  rounded-2xl

                  border
                  border-gray-200

                  transition

                  hover:border-pink-300
                  hover:bg-pink-50
                "
              >
                <Heart size={20} />
              </button>

              <button
                className="
                  flex

                  items-center
                  gap-2

                  rounded-2xl

                  bg-red-50

                  px-5
                  py-3

                  font-semibold

                  text-red-500

                  transition

                  hover:bg-red-500
                  hover:text-white
                "
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