"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { removeFromWishlistAction } from "@/app/features/wishlist/actions";

interface WishlistItem {
  id: number;
  product: {
    id: number;
    title: string;
    slug: string;
    thumbnail: string | null;
    price: number;
    discountPrice: number | null;
    stock: number;
    brand: { title: string } | null;
  };
}

interface Props {
  wishlist: WishlistItem[];
}

function calculateDiscount(price: number, discountPercent: number | null) {
  const percent = discountPercent ?? 0;
  const hasDiscount = percent > 0 && percent < 100;
  const finalPrice = hasDiscount
    ? Math.round(price - (price * percent) / 100)
    : price;

  return { hasDiscount, discountPercent: percent, finalPrice };
}

export default function WishlistCard({ wishlist: initialWishlist }: Props) {
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [pendingId, setPendingId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleRemove(productId: number) {
    setPendingId(productId);

    const previous = wishlist;
    setWishlist((prev) => prev.filter((w) => w.product.id !== productId));

    try {
      const result = await removeFromWishlistAction(productId);

      if (!result.success) {
        setWishlist(previous);
        toast.error(result.error ?? "خطا در حذف از علاقه‌مندی‌ها.");
        return;
      }

      toast.success("از علاقه‌مندی‌ها حذف شد.");
      startTransition(() => router.refresh());
    } catch {
      setWishlist(previous);
      toast.error("خطایی رخ داده است.");
    } finally {
      setPendingId(null);
    }
  }

  return (
    <section className="rounded-[28px] border border-gray-100 bg-white p-4 shadow-sm sm:rounded-[34px] sm:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="rounded-full bg-pink-50 px-4 py-2 text-[13px] font-semibold text-pink-600 sm:text-sm">
            علاقه‌مندی‌ها
          </span>

          <h2 className="mt-3 text-xl font-black text-gray-900 sm:mt-4 sm:text-2xl lg:text-3xl">
            لیست علاقه‌مندی‌های شما
          </h2>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            محصولاتی که برای خرید بعدی ذخیره کرده‌اید.
          </p>
        </div>

        <Link
          href="/products"
          className="
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-pink-500
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-pink-600
            lg:w-auto
          "
        >
          مشاهده محصولات
          <ArrowLeft size={18} />
        </Link>
      </div>

      {/* Empty state */}
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl bg-gray-50 px-4 py-12 text-center sm:py-16">
          <Heart size={40} className="mb-4 text-gray-300" />
          <p className="text-sm text-gray-500 sm:text-base">
            هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید.
          </p>
          <Link
            href="/products"
            className="mt-4 font-semibold text-pink-600 hover:underline"
          >
            مشاهده محصولات
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {wishlist.map((item, index) => {
            const { product } = item;
            const { hasDiscount, finalPrice } = calculateDiscount(
              product.price,
              product.discountPrice,
            );
            const isItemPending = pendingId === product.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="
                  group
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-gray-100
                  bg-white
                  shadow-sm
                  transition-all
                  hover:border-pink-200
                  hover:shadow-xl
                  sm:rounded-[28px]
                "
              >
                {/* Image */}
                <Link
                  href={`/products/${product.slug}`}
                  className="relative block overflow-hidden bg-gray-50"
                >
                  <Image
                    src={product.thumbnail ?? "/placeholder.png"}
                    alt={product.title}
                    width={500}
                    height={500}
                    className="
                      aspect-square
                      w-full
                      object-cover
                      transition
                      duration-500
                      group-hover:scale-110
                    "
                  />

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemove(product.id);
                    }}
                    disabled={isItemPending}
                    className="
                      absolute
                      left-3
                      top-3
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-white/90
                      text-pink-500
                      shadow
                      backdrop-blur
                      disabled:opacity-50
                      sm:left-4
                      sm:top-4
                      sm:h-11
                      sm:w-11
                    "
                  >
                    <Heart size={16} className="fill-pink-500 sm:hidden" />
                    <Heart size={18} className="hidden fill-pink-500 sm:block" />
                  </button>
                </Link>

                {/* Body */}
                <div className="p-3 sm:p-6">
                  <span className="text-xs text-pink-500 sm:text-sm">
                    {product.brand?.title ?? "بدون برند"}
                  </span>

                  <Link href={`/products/${product.slug}`}>
                    <h3 className="mt-2 line-clamp-2 h-12 text-sm font-bold leading-6 text-gray-900 hover:text-pink-600 sm:h-14 sm:text-lg sm:leading-7">
                      {product.title}
                    </h3>
                  </Link>

                  <div className="mt-3 flex flex-wrap items-end justify-between gap-2 sm:mt-5">
                    <div>
                      {hasDiscount && (
                        <p className="text-xs text-gray-400 line-through sm:text-sm">
                          {product.price.toLocaleString("fa-IR")}
                        </p>
                      )}
                      <h4 className="text-lg font-black text-pink-600 sm:text-2xl">
                        {finalPrice.toLocaleString("fa-IR")}
                      </h4>
                      <span className="text-xs text-gray-500 sm:text-sm">
                        تومان
                      </span>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                        product.stock > 0
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {product.stock > 0 ? "موجود" : "ناموجود"}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="mt-4 flex gap-2 sm:mt-6 sm:gap-3">
                    <Link
                      href={`/products/${product.slug}`}
                      className="
                        flex-1
                        rounded-xl
                        bg-linear-to-r
                        from-pink-500
                        to-rose-500
                        py-2.5
                        text-center
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:shadow-lg
                        sm:rounded-2xl
                        sm:py-3
                        sm:text-base
                      "
                    >
                      <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                        <ShoppingBag size={16} className="sm:hidden" />
                        <ShoppingBag size={18} className="hidden sm:block" />
                        <span className="truncate">مشاهده محصول</span>
                      </span>
                    </Link>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRemove(product.id)}
                      disabled={isItemPending}
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-gray-200
                        text-gray-500
                        transition
                        hover:border-red-200
                        hover:bg-red-50
                        hover:text-red-500
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        sm:h-12
                        sm:w-12
                        sm:rounded-2xl
                      "
                    >
                      <Trash2 size={16} className="sm:hidden" />
                      <Trash2 size={18} className="hidden sm:block" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Footer (commented out, left as-is) */}
      {/* {wishlist.length > 0 && (
        <div className="mt-8 rounded-3xl bg-pink-50 p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                ❤️ {wishlist.length} محصول در لیست علاقه‌مندی شما وجود دارد.
              </h3>

              <p className="mt-2 leading-8 text-gray-600">
                قبل از اتمام موجودی، محصولات مورد علاقه خود را به سبد خرید
                اضافه کنید.
              </p>
            </div>

            <Link
              href="/products"
              className="
                rounded-2xl
                bg-white
                px-6
                py-3
                font-semibold
                text-pink-600
                shadow-sm
                transition
                hover:-translate-y-1
              "
            >
              ادامه خرید
            </Link>
          </div>
        </div>
      )} */}
    </section>
  );
}