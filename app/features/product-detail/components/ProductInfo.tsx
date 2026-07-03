"use client";

import { useState } from "react";
import {
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";
import { toast } from "sonner";

export default function ProductInfo() {
  const [quantity, setQuantity] = useState(1);

  const [favorite, setFavorite] = useState(false);

  const [selectedColor, setSelectedColor] = useState(3);

  const colors = [
    "#f5d4c3",
    "#efc4aa",
    "#dfaf89",
    "#c78963",
  ];

  const addToCart = () => {
    toast.success("محصول به سبد خرید اضافه شد 🛒");
  };

  const toggleFavorite = () => {
    setFavorite((prev) => !prev);

    toast.success(
      !favorite
        ? "به علاقه‌مندی‌ها اضافه شد ❤️"
        : "از علاقه‌مندی‌ها حذف شد"
    );
  };

  return (
    <section className="flex h-full flex-col">
      {/* Brand */}

      <span
        className="
          w-fit
          rounded-full
          bg-pink-50
          px-3
          py-1
          text-sm
          font-medium
          text-pink-600
        "
      >
        ESTEE LAUDER
      </span>

      {/* Title */}

      <h1
        className="
          mt-4
          text-3xl
          font-extrabold
          leading-10
          text-gray-900
        "
      >
        کرم پودر دابل ور استی لادر
      </h1>

      {/* Rating */}

      <div className="mt-5 flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((item) => (
            <Star
              key={item}
              className="h-5 w-5 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        <span className="font-semibold text-gray-800">
          4.8
        </span>

        <span className="text-gray-400">
          (۴۸ نظر)
        </span>
      </div>

      {/* Price */}

      <div className="mt-8">
        <div className="flex items-center gap-3">
          <span
            className="
              rounded-xl
              bg-pink-500
              px-3
              py-1
              text-sm
              font-bold
              text-white
            "
          >
            %18
          </span>

          <p className="text-lg text-gray-400 line-through">
            ۲,۹۹۰,۰۰۰
          </p>
        </div>

        <h2
          className="
            mt-2
            text-4xl
            font-extrabold
            text-gray-900
          "
        >
          ۲,۴۵۰,۰۰۰

          <span className="mr-2 text-lg font-medium">
            تومان
          </span>
        </h2>
      </div>

      {/* Description */}

      <p
        className="
          mt-8
          max-w-xl
          leading-8
          text-gray-500
        "
      >
        کرم پودر دابل ور استی لادر با پوشش بسیار بالا،
        ماندگاری ۲۴ ساعته و بافتی سبک، مناسب انواع پوست
        بوده و جلوه‌ای کاملاً طبیعی ایجاد می‌کند.
      </p>

      {/* Colors */}

      <div className="mt-8">
        <h3 className="font-bold text-gray-900">
          رنگ:

          <span className="mr-2 font-normal text-gray-500">
            Beige Natural
          </span>
        </h3>

        <div className="mt-4 flex items-center gap-4">
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(index)}
              style={{ backgroundColor: color }}
              className={`
                h-10
                w-10
                cursor-pointer
                rounded-full
                transition-all
                duration-300

                ${
                  selectedColor === index
                    ? "scale-110 ring-4 ring-pink-400 ring-offset-2"
                    : "hover:scale-110"
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* Quantity */}

      <div className="mt-8">
        <h3 className="mb-3 font-bold">
          تعداد
        </h3>

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
            onClick={() => setQuantity((q) => q + 1)}
            className="
              flex
              h-12
              w-12
              cursor-pointer
              items-center
              justify-center
              transition
              hover:bg-gray-100
            "
          >
            <Plus size={18} />
          </button>

          <span className="w-14 text-center font-bold">
            {quantity}
          </span>

          <button
            onClick={() =>
              setQuantity((q) =>
                q > 1 ? q - 1 : 1
              )
            }
            className="
              flex
              h-12
              w-12
              cursor-pointer
              items-center
              justify-center
              transition
              hover:bg-gray-100
            "
          >
            <Minus size={18} />
          </button>
        </div>
      </div>

      {/* Buttons */}

      <div className="mt-10 flex gap-4">
        <button
          onClick={addToCart}
          className="
            flex
            flex-1
            cursor-pointer
            items-center
            justify-center
            gap-3

            rounded-2xl

            bg-pink-500

            py-4

            text-lg
            font-bold
            text-white

            transition-all
            duration-300

            hover:scale-[1.02]
            hover:bg-pink-600
            hover:shadow-xl
          "
        >
          <ShoppingCart size={22} />

          افزودن به سبد خرید
        </button>

        <button
          onClick={toggleFavorite}
          className="
            flex
            h-14
            w-14
            cursor-pointer
            items-center
            justify-center

            rounded-2xl

            border
            border-gray-200

            bg-white

            transition-all
            duration-300

            hover:border-pink-400
            hover:bg-pink-50
          "
        >
          <Heart
            className={`h-6 w-6 transition-all ${
              favorite
                ? "fill-pink-500 text-pink-500"
                : "text-gray-500"
            }`}
          />
        </button>
      </div>
    </section>
  );
}