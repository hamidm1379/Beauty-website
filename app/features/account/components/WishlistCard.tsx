"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
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

const ITEMS_PER_PAGE = 9;

export default function WishlistCard({ wishlist: initialWishlist }: Props) {
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [pendingId, setPendingId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const totalPages = Math.ceil(wishlist.length / ITEMS_PER_PAGE);
  const paginatedWishlist = wishlist.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {paginatedWishlist.map((item, index) => {
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
                    flex
                    h-full
                    flex-col
                    overflow-hidden
                    rounded-2xl
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
                      aspect-[5/4]
                      w-full
                      object-cover
                      transition
                      duration-500
                      group-hover:scale-110
                      sm:aspect-square
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
                      left-2
                      top-2
                      flex
                      h-8
                      w-8
                      cursor-pointer
                      items-center
                      justify-center
                      rounded-full
                      bg-white/90
                      text-pink-500
                      shadow
                      backdrop-blur
                      disabled:opacity-50
                      sm:left-3
                      sm:top-3
                      sm:h-9
                      sm:w-9
                    "
                  >
                    <Heart size={14} className="fill-pink-500 sm:hidden" />
                    <Heart size={16} className="hidden fill-pink-500 sm:block" />
                  </button>
                </Link>

                {/* Body */}
                <div className="flex flex-1 flex-col p-2.5 sm:p-3">
                  <span className="text-[10px] font-medium text-pink-500 sm:text-xs">
                    {product.brand?.title ?? "بدون برند"}
                  </span>

                  <Link href={`/products/${product.slug}`}>
                    <h3 className="mt-1 line-clamp-2 text-xs font-bold leading-4.5 text-gray-900 hover:text-pink-600 sm:mt-2 sm:text-sm sm:leading-5">
                      {product.title}
                    </h3>
                  </Link>

                  <div className="mt-2 flex items-end justify-between gap-1.5 sm:mt-3">
                    <div>
                      {hasDiscount && (
                        <p className="text-[11px] text-gray-400 line-through sm:text-sm">
                          {product.price.toLocaleString("fa-IR")}
                        </p>
                      )}
                      <p className="flex items-baseline gap-1">
                        <span className="text-sm font-black text-pink-600 sm:text-xl">
                          {finalPrice.toLocaleString("fa-IR")}
                        </span>
                        <span className="text-[10px] font-medium text-gray-500 sm:text-sm">
                          تومان
                        </span>
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold sm:px-3 sm:py-1 sm:text-xs ${
                        product.stock > 0
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {product.stock > 0 ? "موجود" : "ناموجود"}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="mt-auto flex gap-2 pt-2.5 sm:pt-3">
                    <Link
                      href={`/products/${product.slug}`}
                      className="
                        flex
                        flex-1
                        cursor-pointer
                        items-center
                        justify-center
                        gap-1.5
                        rounded-xl
                        bg-linear-to-r
                        from-pink-500
                        to-rose-500
                        px-2
                        py-2
                        text-xs
                        font-bold
                        text-white
                        shadow-sm
                        shadow-pink-500/20
                        transition
                        hover:shadow-md
                        hover:shadow-pink-500/30
                        active:scale-[0.98]
                        sm:gap-2
                        sm:rounded-2xl
                        sm:px-4
                        sm:py-2.5
                        sm:text-sm
                      "
                    >
                      <ShoppingBag size={15} className="shrink-0" />
                      <span className="truncate">مشاهده محصول</span>
                    </Link>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRemove(product.id)}
                      disabled={isItemPending}
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        cursor-pointer
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
                        active:scale-95
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        sm:h-11
                        sm:w-11
                        sm:rounded-2xl
                      "
                    >
                      <Trash2 size={15} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-pink-300 hover:text-pink-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-500"
          >
            <ChevronRight size={18} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition ${
                page === currentPage
                  ? "bg-pink-500 text-white shadow-md"
                  : "border border-gray-200 text-gray-600 hover:border-pink-300 hover:text-pink-600"
              }`}
            >
              {page.toLocaleString("fa-IR")}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-pink-300 hover:text-pink-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-500"
          >
            <ChevronLeft size={18} />
          </button>
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