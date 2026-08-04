"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Star,
  Check,
  X,
  Trash2,
  ChevronDown,
  ChevronUp,
  MessageCircle,
} from "lucide-react";

import {
  approveReviewAction,
  rejectReviewAction,
  deleteReviewAction,
} from "./actions";

interface ReviewUser {
  id: number;
  firstName: string;
  lastName: string | null;
  phone: string;
}

interface ReviewProduct {
  id: number;
  title: string;
  slug: string;
}

interface ReviewItem {
  id: number;
  title: string | null;
  comment: string;
  rating: number;
  advantages: string | null;
  disadvantages: string | null;
  isApproved: boolean;
  createdAt: string | Date;
  user: ReviewUser;
  product: ReviewProduct;
}

interface Props {
  reviews: ReviewItem[];
}

export default function ReviewsTable({ reviews: initialReviews }: Props) {
  const [reviews, setReviews] = useState(initialReviews);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [pendingId, setPendingId] = useState<number | null>(null);
  const router = useRouter();

  async function handleApprove(item: ReviewItem) {
    setPendingId(item.id);

    const previous = reviews;
    setReviews((prev) =>
      prev.map((r) => (r.id === item.id ? { ...r, isApproved: true } : r)),
    );

    try {
      const result = await approveReviewAction(item.id);

      if (!result.success) {
        setReviews(previous);
        toast.error(result.error ?? "خطا در تایید نظر.");
      } else {
        toast.success("نظر تایید شد.");
        router.refresh();
      }
    } catch {
      setReviews(previous);
      toast.error("خطایی رخ داده است.");
    } finally {
      setPendingId(null);
    }
  }

  async function handleReject(item: ReviewItem) {
    setPendingId(item.id);

    const previous = reviews;
    setReviews((prev) =>
      prev.map((r) => (r.id === item.id ? { ...r, isApproved: false } : r)),
    );

    try {
      const result = await rejectReviewAction(item.id);

      if (!result.success) {
        setReviews(previous);
        toast.error(result.error ?? "خطا در رد نظر.");
      } else {
        toast.success("نظر رد شد.");
        router.refresh();
      }
    } catch {
      setReviews(previous);
      toast.error("خطایی رخ داده است.");
    } finally {
      setPendingId(null);
    }
  }

  async function handleDelete(id: number) {
    setPendingId(id);

    const previous = reviews;
    setReviews((prev) => prev.filter((r) => r.id !== id));

    try {
      const result = await deleteReviewAction(id);

      if (!result.success) {
        setReviews(previous);
        toast.error(result.error ?? "خطا در حذف نظر.");
        return;
      }

      toast.success("نظر حذف شد.");
      router.refresh();
    } catch {
      setReviews(previous);
      toast.error("خطایی رخ داده است.");
    } finally {
      setPendingId(null);
    }
  }

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white py-10 text-center shadow-sm sm:rounded-3xl sm:py-16">
        <MessageCircle size={32} className="mb-3 text-gray-300 sm:mb-4 sm:size-10" />
        <p className="text-sm text-gray-500 sm:text-base">هیچ نظری ثبت نشده است.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm sm:rounded-3xl">
      <ul className="divide-y divide-gray-100">
        {reviews.map((item) => {
          const isExpanded = expandedId === item.id;
          const isItemPending = pendingId === item.id;

          return (
            <li key={item.id} className="p-3 sm:p-5">
              <div
                onClick={() =>
                  setExpandedId((prev) => (prev === item.id ? null : item.id))
                }
                className="flex cursor-pointer items-start justify-between gap-3 sm:gap-4"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="mt-1 flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={12}
                        className={`sm:hidden ${s <= item.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <div className="mt-1 hidden gap-0.5 sm:flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        className={
                          s <= item.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className={`text-sm font-bold sm:text-base ${item.isApproved ? "text-gray-700" : "text-gray-900"}`}>
                        {item.title ?? "بدون عنوان"}
                      </span>

                      {item.isApproved ? (
                        <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-[11px] font-semibold text-green-600 sm:px-2 sm:text-xs">
                          تایید شده
                        </span>
                      ) : (
                        <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[11px] font-semibold text-amber-600 sm:px-2 sm:text-xs">
                          در انتظار تایید
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                      {item.user.firstName} {item.user.lastName ?? ""} ·{" "}
                      <Link
                        href={`/admin/products/${item.product.id}/edit`}
                        className="text-pink-500 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.product.title}
                      </Link>
                    </p>

                    <p className="mt-1 text-[11px] text-gray-400 sm:text-xs">
                      {new Date(item.createdAt).toLocaleDateString("fa-IR")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  {!item.isApproved ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApprove(item);
                      }}
                      disabled={isItemPending}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition hover:border-green-200 hover:bg-green-50 hover:text-green-500 disabled:cursor-not-allowed disabled:opacity-50 sm:h-9 sm:w-9 sm:rounded-xl"
                      title="تایید"
                    >
                      <Check size={14} className="sm:hidden" />
                      <Check size={16} className="hidden sm:block" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReject(item);
                      }}
                      disabled={isItemPending}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-500 disabled:cursor-not-allowed disabled:opacity-50 sm:h-9 sm:w-9 sm:rounded-xl"
                      title="رد"
                    >
                      <X size={14} className="sm:hidden" />
                      <X size={16} className="hidden sm:block" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    disabled={isItemPending}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50 sm:h-9 sm:w-9 sm:rounded-xl"
                    title="حذف"
                  >
                    <Trash2 size={14} className="sm:hidden" />
                    <Trash2 size={16} className="hidden sm:block" />
                  </button>

                  {isExpanded ? (
                    <ChevronUp size={16} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-400" />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="mt-3 space-y-2.5 rounded-xl bg-gray-50 p-3 text-xs leading-6 text-gray-700 sm:mt-4 sm:space-y-3 sm:rounded-2xl sm:p-4 sm:text-sm sm:leading-7">
                  <p>{item.comment}</p>

                  {item.advantages && (
                    <div>
                      <span className="font-bold text-green-600">مزایا: </span>
                      <span>{item.advantages}</span>
                    </div>
                  )}

                  {item.disadvantages && (
                    <div>
                      <span className="font-bold text-red-500">معایب: </span>
                      <span>{item.disadvantages}</span>
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}