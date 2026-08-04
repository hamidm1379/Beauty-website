"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/errors";

interface Props {
  couponId: number;
  couponCode: string;
}

export default function CouponRowActions({ couponId, couponCode }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    if (!confirming) {
      setConfirming(true);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`/api/coupons/${couponId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "خطا در حذف کد تخفیف");
      }

      toast.success(`کد تخفیف «${couponCode}» حذف شد.`);
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  }

  return (
    <div className="flex items-center justify-end gap-1.5 sm:gap-2">
      <Link
        href={`/admin/coupons/${couponId}/edit`}
        className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600 sm:h-9 sm:w-9"
        aria-label="ویرایش"
      >
        <Pencil size={14} className="sm:hidden" />
        <Pencil size={16} className="hidden sm:block" />
      </Link>

      {confirming ? (
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex h-7 items-center gap-1.5 rounded-lg bg-red-500 px-2 text-[11px] font-semibold text-white transition hover:bg-red-600 disabled:opacity-50 sm:h-9 sm:px-3 sm:text-xs"
          >
            {loading ? <Loader2 size={13} className="animate-spin" /> : "مطمئنی؟"}
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            disabled={loading}
            className="flex h-7 items-center rounded-lg border border-gray-200 px-2 text-[11px] font-medium text-gray-500 transition hover:bg-gray-50 sm:h-9 sm:px-3 sm:text-xs"
          >
            انصراف
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleDelete}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-red-300 hover:bg-red-50 hover:text-red-500 sm:h-9 sm:w-9"
          aria-label="حذف"
        >
          <Trash2 size={14} className="sm:hidden" />
          <Trash2 size={16} className="hidden sm:block" />
        </button>
      )}
    </div>
  );
}