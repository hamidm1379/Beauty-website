"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Check, Percent, Tag, Eye } from "lucide-react";
import { addToCartAction } from "@/app/features/cart/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface Product {
  id: number;
  title: string;
  slug: string;
  thumbnail?: string | null;
  brand?: {
    title: string;
  } | null;
  price: number;
  discountPrice?: number | null;
}

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const discountPercent = product.discountPrice ?? 0;
  const hasDiscount = discountPercent > 0 && discountPercent < 100;
  const router = useRouter();
  const finalPrice = hasDiscount
    ? Math.round(product.price - (product.price * discountPercent) / 100)
    : product.price;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const result = await addToCartAction(product.id);

      if (!result.success) {
        toast.error(result.error ?? "خطا در افزودن محصول", {
          description: "دوباره تلاش کنید.",
        });

        return;
      }

      setJustAdded(true);
      router.refresh();
      toast.success("محصول به سبد خرید اضافه شد 🛒", {
        description: product.title,
        duration: 2500,
        action: {
          label: "مشاهده سبد",
          onClick: () => {
            window.location.href = "/cart";
          },
        },
      });

      setTimeout(() => {
        setJustAdded(false);
      }, 1500);
    } catch {
      toast.error("خطایی رخ داد.");
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted((prev) => !prev);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-gray-100
        bg-white
        shadow-sm
        transition-shadow
        duration-300
        hover:shadow-xl
        hover:shadow-pink-100/60
        md:rounded-3xl
      "
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50 md:rounded-2xl">
          {/* Discount badge */}
          {hasDiscount && (
            <span
              className="
                absolute
                left-2
                top-2
                z-10
                flex
                items-center
                gap-0.5
                rounded-full
                bg-linear-to-l
                from-pink-500
                to-rose-400
                px-1.5
                py-0.5
                text-[9px]
                font-bold
                text-white
                shadow-md
                shadow-pink-200/60
                md:left-3
                md:top-3
                md:gap-1
                md:px-2.5
                md:py-1
                md:text-[11px]
              "
            >
              <Percent size={9} className="md:hidden" />
              <Percent size={11} className="hidden md:block" />
              {discountPercent.toLocaleString("fa-IR")}
            </span>
          )}

          {/* Wishlist button */}
          {/* <motion.button
            onClick={handleWishlist}
            whileTap={{ scale: 0.85 }}
            aria-label="افزودن به علاقه‌مندی‌ها"
            className="
              absolute
              right-2
              top-2
              z-10
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-full
              bg-white/80
              text-gray-400
              opacity-0
              backdrop-blur
              transition-all
              duration-300
              group-hover:opacity-100
              hover:bg-white
              md:right-3
              md:top-3
              md:h-7
              md:w-7
            "
          >
            <Heart
              size={13}
              className={
                isWishlisted
                  ? "fill-pink-500 text-pink-500"
                  : "fill-transparent"
              }
            />
          </motion.button> */}

          <Image
            src={product.thumbnail || "/placeholder-product.png"}
            alt={product.title}
            fill
            className="
              rounded-xl
              object-contain
              p-1
              transition-transform
              duration-500
              group-hover:scale-110
              md:rounded-2xl
              md:p-3
            "
          />
        </div>

        {/* Content */}
        <div className="p-3 md:p-4">
          <p className="flex items-center gap-1 text-[10px] text-gray-400 md:text-[13px]">
            <Tag size={11} className="shrink-0" />
            {product.brand?.title || "بدون برند"}
          </p>

          <h3 className="mt-0.5 md:mt-1 line-clamp-2 min-h-[1.3em] md:min-h-[2.6em] text-[13px] font-medium leading-6 text-gray-800 md:text-[16px]">
            {product.title}
          </h3>

          {/* Price */}
          <div className="mt-1 md:mt-3 flex items-baseline gap-2">
            {hasDiscount ? (
              <>
                <p className="text-[12px] font-bold text-pink-600 md:text-[16px]">
                  {finalPrice.toLocaleString("fa-IR")}
                  <span className="mr-1 text-[10px] font-normal text-gray-400 md:text-[12px]">
                    تومان
                  </span>
                </p>

                <p className="text-[11px] text-gray-400 line-through md:text-[13px]">
                  {product.price.toLocaleString("fa-IR")}
                </p>
              </>
            ) : (
              <p className="text-[12px] font-bold text-gray-800 md:text-[16px]">
                {product.price.toLocaleString("fa-IR")}
                <span className="mr-1 text-[10px] font-normal text-gray-400 md:text-[12px]">
                  تومان
                </span>
              </p>
            )}
          </div>
        </div>
      </Link>

      {/* Add to cart */}
      <div className="px-4 pb-4 ">
        <Link href={`/products/${product.slug}`} className="block">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="
            flex
            w-full
            items-center
            justify-center
            gap-1.5
            rounded-lg
            bg-linear-to-l
            from-pink-500
            to-rose-400
            py-1.5
            text-[9px]
            font-bold
            text-white
            shadow-md
            shadow-pink-200/50
            transition-all
            duration-300
            hover:shadow-lg
            hover:shadow-pink-300/50
            md:rounded-xl
            md:py-2
            md:text-[12.5px]
            sm:text-[10px]
            cursor-pointer
          "
          >
            <Eye size={12} />
            مشاهده محصول
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}