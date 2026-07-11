"use client";

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
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
      >
        <Trash2 size={18} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
            <div className="flex justify-center">
              <div className="rounded-full bg-red-100 p-5">
                <Trash2
                  className="text-red-600"
                  size={34}
                />
              </div>
            </div>

            <h2 className="mt-6 text-center text-2xl font-bold">
              حذف بنر
            </h2>

            <p className="mt-4 text-center text-gray-500">
              آیا از حذف بنر
            </p>

            <p className="mt-2 text-center font-semibold text-gray-900">
              {bannerTitle}
            </p>

            <p className="mt-2 text-center text-gray-500">
              اطمینان دارید؟
            </p>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setOpen(false)}
                disabled={loading}
                className="
                  flex-1
                  rounded-xl
                  border
                  border-gray-300
                  py-3
                  font-medium
                  transition
                  hover:bg-gray-100
                "
              >
                انصراف
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="
                  flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-red-600
                  py-3
                  font-medium
                  text-white
                  transition
                  hover:bg-red-700
                "
              >
                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    در حال حذف...
                  </>
                ) : (
                  <>
                    <Trash2 size={18} />
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