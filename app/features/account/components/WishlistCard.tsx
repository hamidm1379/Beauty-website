"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { removeFromWishlistAction } from "@/app/features/wishlist/actions";

// شکل دیتایی که از userRepository.getAccountProfile برمی‌گرده
interface WishlistItem {
  id: number; // id ردیف wishlist (نه محصول)
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

    // optimistic: فوراً از لیست محلی حذفش می‌کنیم
    const previous = wishlist;
    setWishlist((prev) => prev.filter((w) => w.product.id !== productId));

    try {
      const result = await removeFromWishlistAction(productId);

      if (!result.success) {
        setWishlist(previous); // rollback
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
    <section className="rounded-[34px] border border-gray-100 bg-white p-8 shadow-sm">
      {/* Header */}

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-600">
            علاقه‌مندی‌ها
          </span>

          <h2 className="mt-4 text-3xl font-black text-gray-900">
            لیست علاقه‌مندی‌های شما
          </h2>

          <p className="mt-2 text-gray-500">
            محصولاتی که برای خرید بعدی ذخیره کرده‌اید.
          </p>
        </div>

        <Link
          href="/products"
          className="
            inline-flex
            items-center
            gap-2
            rounded-2xl
            bg-pink-500
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-pink-600
          "
        >
          مشاهده محصولات
          <ArrowLeft size={18} />
        </Link>
      </div>

      {/* Empty state */}
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl bg-gray-50 py-16 text-center">
          <Heart size={40} className="mb-4 text-gray-300" />
          <p className="text-gray-500">
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
        <div className="grid gap-6 lg:grid-cols-3">
          {wishlist.map((item, index) => {
            const { product } = item;
            const { hasDiscount, discountPercent, finalPrice } =
              calculateDiscount(product.price, product.discountPrice);
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
                  rounded-[28px]
                  border
                  border-gray-100
                  bg-white
                  shadow-sm
                  transition-all
                  hover:border-pink-200
                  hover:shadow-xl
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
                      left-4
                      top-4
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      bg-white/90
                      text-pink-500
                      backdrop-blur
                      shadow
                      disabled:opacity-50
                    "
                  >
                    <Heart size={18} className="fill-pink-500" />
                  </button>
                </Link>

                {/* Body */}
                <div className="p-6">
                  <span className="text-sm text-pink-500">
                    {product.brand?.title ?? "بدون برند"}
                  </span>

                  <Link href={`/products/${product.slug}`}>
                    <h3 className="mt-2 line-clamp-2 h-14 text-lg font-bold leading-7 text-gray-900 hover:text-pink-600">
                      {product.title}
                    </h3>
                  </Link>

                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      {hasDiscount && (
                        <p className="text-sm text-gray-400 line-through">
                          {product.price.toLocaleString("fa-IR")}
                        </p>
                      )}
                      <h4 className="text-2xl font-black text-pink-600">
                        {finalPrice.toLocaleString("fa-IR")}
                      </h4>
                      <span className="text-sm text-gray-500">تومان</span>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        product.stock > 0
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {product.stock > 0 ? "موجود" : "ناموجود"}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="mt-6 flex gap-3">
                    <Link
                      href={`/products/${product.slug}`}
                      className="
                        flex-1
                        rounded-2xl
                        bg-linear-to-r
                        from-pink-500
                        to-rose-500
                        py-3
                        text-center
                        font-semibold
                        text-white
                        transition
                        hover:shadow-lg
                      "
                    >
                      <span className="flex items-center justify-center gap-2">
                        <ShoppingBag size={18} />
                        مشاهده محصول
                      </span>
                    </Link>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRemove(product.id)}
                      disabled={isItemPending}
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-gray-200
                        text-gray-500
                        transition
                        hover:border-red-200
                        hover:bg-red-50
                        hover:text-red-500
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Footer */}
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