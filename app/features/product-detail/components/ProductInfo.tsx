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
        {product.brand?.title ?? "بدون برند"}
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
        {product.title}
      </h1>

      {/* Price */}

      <div className="mt-8">
        {hasDiscount && (
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
              ٪{discountPercent.toLocaleString("fa-IR")}
            </span>

            <p
              className="
          text-lg
          text-gray-400
          line-through
        "
            >
              {product.price.toLocaleString("fa-IR")}
            </p>
          </div>
        )}

        <div
          className="
      mt-2
      text-4xl
      font-extrabold
      text-gray-900
    "
        >
          {finalPrice.toLocaleString("fa-IR")}

          <span
            className="
        mr-2
        text-lg
        font-medium
      "
          >
            تومان
          </span>
        </div>
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
        {product.shortDescription ?? "توضیحاتی برای این محصول ثبت نشده است."}
      </p>

      {/* Variants */}
      {product.variants && product.variants.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-3 font-bold">رنگ‌بندی</h3>

          <div className="flex flex-wrap gap-3">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => setSelectedVariantId(variant.id)}
                title={variant.colorName}
                className={`
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  transition-all
                  duration-200
                  ${
                    selectedVariantId === variant.id
                      ? "border-pink-500 ring-2 ring-pink-200"
                      : "border-gray-200 hover:border-gray-400"
                  }
                  ${
                    variant.stock === 0
                      ? "opacity-40  cursor-pointer"
                      : "cursor-pointer"
                  }
                `}
              >
                <span
                  className="h-7 w-7 rounded-full border border-black/10"
                  style={{ backgroundColor: variant.colorCode }}
                />
              </button>
            ))}
          </div>

          {selectedVariantId && (
            <p className="mt-2 text-sm text-gray-500">
              {" "}
              کد :
              {
                product.variants.find((v) => v.id === selectedVariantId)
                  ?.colorName
              }
            </p>
          )}
        </div>
      )}
      {/* Buttons */}
      <div className="mt-10 flex gap-4">
        <button
          onClick={addToCart}
          disabled={product.stock === 0}
          className={`
        flex
        flex-1
        items-center
        justify-center
        gap-3
        rounded-2xl
        py-4
        text-lg
        font-bold
        transition-all
        duration-300
        ${
          product.stock === 0
            ? "cursor-not-allowed bg-gray-300 text-white"
            : "cursor-pointer bg-pink-500 text-white hover:bg-pink-600 hover:shadow-xl"
        }
      `}
        >
          <ShoppingCart size={22} />

          {product.stock === 0 ? "ناموجود" : "افزودن به سبد خرید"}
        </button>

        <button
          onClick={toggleFavorite}
          disabled={favoriteLoading}
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
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
        >
          <Heart
            className={`h-6 w-6 ${
              favorite ? "fill-pink-500 text-pink-500" : "text-gray-500"
            }`}
          />
        </button>
      </div>
    </section>
  );
}