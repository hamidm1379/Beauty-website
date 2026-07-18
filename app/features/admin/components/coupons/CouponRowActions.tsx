"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

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
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Link
        href={`/admin/coupons/${couponId}/edit`}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600"
        aria-label="ویرایش"
      >
        <Pencil size={16} />
      </Link>

      {confirming ? (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex h-9 items-center gap-1.5 rounded-lg bg-red-500 px-3 text-xs font-semibold text-white transition hover:bg-red-600 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              "مطمئنی؟"
            )}
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            disabled={loading}
            className="flex h-9 items-center rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-500 transition hover:bg-gray-50"
          >
            انصراف
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleDelete}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-red-300 hover:bg-red-50 hover:text-red-500"
          aria-label="حذف"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}