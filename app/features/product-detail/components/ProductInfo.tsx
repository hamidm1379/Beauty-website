"use client";

import { useState } from "react";
import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addToCartAction } from "@/app/features/cart/actions";
import { toggleWishlistAction } from "@/app/features/wishlist/actions";

function calculateDiscount(
  price: number,
  discountPercent: number | null | undefined,
) {
  const percent = discountPercent ?? 0;

  const hasDiscount = percent > 0 && percent < 100;

  const finalPrice = hasDiscount
    ? Math.round(price - (price * percent) / 100)
    : price;

  return {
    hasDiscount,
    discountPercent: percent,
    finalPrice,
  };
}

// ========== Types ==========
interface Props {
  product: {
    id: number;
    title: string;
    price: number;
    discountPrice: number | null;
    stock: number;
    soldCount: number;
    shortDescription: string | null;

    brand: {
      title: string;
    } | null;

    review: {
      rating: number;
    }[];
    variants?: {
      id: number;
      title: string;
      colorName: string;
      colorCode: string;
      stock: number;
    }[];
  };
  // وضعیت اولیه علاقه‌مندی، باید از سرور (صفحه‌ی والد) با چک کردن session
  // و wishlistService.isInWishlist محاسبه و پاس داده بشه. پیش‌فرض false.
  initialFavorite?: boolean;
}

// ========== Component ==========
export default function ProductInfo({
  product,
  initialFavorite = false,
}: Props) {
  const [quantity, setQuantity] = useState(1);

  const [favorite, setFavorite] = useState(initialFavorite);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    product.variants && product.variants.length > 0
      ? product.variants[0].id
      : null,
  );
  const reviewsCount = product.review.length;
  const router = useRouter();
  const averageRating =
    reviewsCount > 0
      ? (
          product.review.reduce((sum, item) => sum + item.rating, 0) /
          reviewsCount
        ).toFixed(1)
      : "0";

  const { hasDiscount, discountPercent, finalPrice } = calculateDiscount(
    product.price,
    product.discountPrice,
  );

  const addToCart = async () => {
    if (product.stock === 0) {
      toast.error("این محصول موجود نیست.");

      return;
    }

    try {
      const result = await addToCartAction(
        product.id,
        quantity,
        selectedVariantId ?? undefined,
      );

      if (!result.success) {
        toast.error(result.error ?? "خطا در افزودن محصول.");

        return;
      }

      router.refresh();

      if (result.alreadyInCart) {
        toast.info("این محصول قبلاً به سبد خرید اضافه شده بود.", {
          description: `تعداد آن به‌روزرسانی شد.`,
          duration: 2500,
          className: "font-medium text-[14px] leading-7 !rounded-2xl",
          descriptionClassName: "text-[13px] text-gray-500 font-normal",
          action: {
            label: "مشاهده سبد",
            onClick: () => {
              window.location.href = "/cart";
            },
          },
        });
      } else {
        toast.success("محصول به سبد خرید اضافه شد.", {
          description: `${quantity.toLocaleString(
            "fa-IR",
          )} عدد از ${product.title}`,
          duration: 2500,
          className: "font-medium text-[14px] leading-7 !rounded-2xl",
          descriptionClassName: "text-[13px] text-gray-500 font-normal",
          action: {
            label: "مشاهده سبد",
            onClick: () => {
              window.location.href = "/cart";
            },
          },
        });
      }
    } catch {
      toast.error("خطایی رخ داده است.");
    }
  };

  const toggleFavorite = async () => {
    if (favoriteLoading) return;

    // optimistic update: بلافاصله UI رو تغییر می‌دیم تا حس سریع بودن داشته باشه
    const previous = favorite;
    setFavorite(!previous);
    setFavoriteLoading(true);

    try {
      const result = await toggleWishlistAction(product.id);

      if (!result.success) {
        // rollback در صورت خطا (مثلاً کاربر لاگین نیست)
        setFavorite(previous);
        toast.error(result.error ?? "خطا در بروزرسانی علاقه‌مندی‌ها.");
        return;
      }

      setFavorite(result.isFavorite);

      toast.success(
        result.isFavorite
          ? "به علاقه‌مندی‌ها اضافه شد."
          : "از علاقه‌مندی‌ها حذف شد.",
      );
    } catch {
      setFavorite(previous);
      toast.error("خطایی رخ داده است.");
    } finally {
      setFavoriteLoading(false);
    }
  };

  return (
    <section className="flex h-full flex-col">
      {/* Brand */}
      <span
        className="
          w-fit rounded-full
          bg-pink-50 px-2.5 py-1
          text-xs font-medium text-pink-600
          sm:px-3 sm:text-sm
        "
      >
        {product.brand?.title ?? "بدون برند"}
      </span>

      {/* Title */}
      <h1
        className="
          mt-3 text-lg sm:text-xl font-extrabold leading-8 text-gray-900
          sm:mt-4 md:text-2xl sm:leading-9
          lg:text-3xl lg:leading-10
        "
      >
        {product.title}
      </h1>

      {/* Price */}
      <div className=" sm:mt-4 md:mt-8">
        {hasDiscount && (
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span
              className="
                rounded-xl bg-pink-500
                px-2.5 py-1 text-xs font-bold text-white
                sm:px-3 sm:text-sm
              "
            >
              ٪{discountPercent.toLocaleString("fa-IR")}
            </span>

            <p className="text-base text-gray-400 line-through sm:text-lg">
              {product.price.toLocaleString("fa-IR")}
            </p>
          </div>
        )}

        <div className="mt-2 text-xl sm:text-2xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl">
          {finalPrice.toLocaleString("fa-IR")}

          <span className="mr-1.5 text-sm font-medium sm:mr-2 sm:text-lg">
            تومان
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-2 max-w-xl text-sm leading-7 text-gray-500 sm:mt-8 sm:text-base sm:leading-8">
        {product.shortDescription ?? "توضیحاتی برای این محصول ثبت نشده است."}
      </p>

      {/* Variants */}
      {product.variants && product.variants.length > 0 && (
        <div className="mt-6 sm:mt-8">
          <h3 className="mb-3 text-sm font-bold sm:text-base">رنگ‌بندی</h3>

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => setSelectedVariantId(variant.id)}
                title={variant.colorName}
                className={`
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  transition-all
                  duration-200
                  sm:h-11
                  sm:w-11
                  ${
                    selectedVariantId === variant.id
                      ? "border-pink-500 ring-2 ring-pink-200"
                      : "border-gray-200 hover:border-gray-400"
                  }
                  ${
                    variant.stock === 0
                      ? "opacity-40 cursor-pointer"
                      : "cursor-pointer"
                  }
                `}
              >
                <span
                  className="h-6 w-6 rounded-full border border-black/10 sm:h-7 sm:w-7"
                  style={{ backgroundColor: variant.colorCode }}
                />
              </button>
            ))}
          </div>

          {selectedVariantId && (
            <p className="mt-2 text-xs text-gray-500 sm:text-sm">
              {" "}
              
              {
                product.variants.find((v) => v.id === selectedVariantId)
                  ?.colorName
              }
            </p>
          )}
        </div>
      )}

      {/* Buttons */}
      <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:gap-4 sm:pt-10">
        <button
          onClick={addToCart}
          disabled={product.stock === 0}
          className={`
      order-1 flex flex-1
      items-center justify-center gap-2.5
      rounded-2xl py-3.5
      text-base font-bold
      transition-all duration-300
      sm:order-none sm:gap-3 sm:py-4 sm:text-lg
      ${
        product.stock === 0
          ? "cursor-not-allowed bg-gray-300 text-white"
          : "cursor-pointer bg-pink-500 text-white hover:bg-pink-600 hover:shadow-xl"
      }
    `}
        >
          <ShoppingCart className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
          {product.stock === 0 ? "ناموجود" : "افزودن به سبد خرید"}
        </button>

        <button
          onClick={toggleFavorite}
          disabled={favoriteLoading}
          className="
      order-2 flex h-12 w-full
      cursor-pointer items-center justify-center gap-2
      rounded-2xl border border-gray-200
      bg-white
      transition-all duration-300
      hover:border-pink-400 hover:bg-pink-50
      disabled:cursor-not-allowed disabled:opacity-60
      sm:order-none sm:h-14 sm:w-14 sm:gap-0
    "
        >
          <Heart
            className={`h-5 w-5 sm:h-6 sm:w-6 ${
              favorite ? "fill-pink-500 text-pink-500" : "text-gray-500"
            }`}
          />
          <span className="text-sm font-medium text-gray-600 sm:hidden">
            {favorite ? "در علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
          </span>
        </button>
      </div>
    </section>
  );
}
