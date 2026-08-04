"use client";
import { getErrorMessage } from "@/lib/utils/errors";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteBannerModalProps {
  bannerId: number;
  bannerTitle: string;
}

export default function DeleteBannerModal({
  bannerId,
  bannerTitle,
}: DeleteBannerModalProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      const res = await fetch(`/api/banners/${bannerId}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success("بنر با موفقیت حذف شد.");

      setOpen(false);

      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-red-50 p-1.5 text-red-600 transition hover:bg-red-100 sm:rounded-xl sm:p-2"
      >
        <Trash2 size={16} className="sm:hidden" />
        <Trash2 size={18} className="hidden sm:block" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:rounded-3xl sm:p-8">
            <div className="flex justify-center">
              <div className="rounded-full bg-red-100 p-3 sm:p-5">
                <Trash2 className="text-red-600" size={24} />
              </div>
            </div>

            <h2 className="mt-4 text-center text-lg font-bold sm:mt-6 sm:text-2xl">
              حذف بنر
            </h2>

            <p className="mt-3 text-center text-sm text-gray-500 sm:mt-4 sm:text-base">
              آیا از حذف بنر
            </p>

            <p className="mt-1.5 text-center text-sm font-semibold text-gray-900 sm:mt-2 sm:text-base">
              {bannerTitle}
            </p>

            <p className="mt-1.5 text-center text-sm text-gray-500 sm:mt-2 sm:text-base">
              اطمینان دارید؟
            </p>

            <div className="mt-6 flex gap-2.5 sm:mt-8 sm:gap-3">
              <button
                onClick={() => setOpen(false)}
                disabled={loading}
                className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium transition hover:bg-gray-100 sm:rounded-xl sm:py-3 sm:text-base"
              >
                انصراف
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 py-2 text-sm font-medium text-white transition hover:bg-red-700 sm:rounded-xl sm:py-3 sm:text-base"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    در حال حذف...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    حذف
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}