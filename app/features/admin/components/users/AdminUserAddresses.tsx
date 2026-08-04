"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Star, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/errors";

interface Address {
  id: number;
  title: string;
  receiverName: string;
  receiverPhone: string;
  province: string;
  city: string;
  postalCode: string;
  addressLine: string;
  plaque: string | null;
  unit: string | null;
  isDefault: boolean;
}

interface Props {
  userId: number;
  addresses: Address[];
}

export default function AdminUserAddresses({ userId, addresses }: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function performDelete(addressId: number) {
    try {
      setDeletingId(addressId);

      const res = await fetch(
        `/api/users/${userId}/addresses/${addressId}`,
        { method: "DELETE" },
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message ?? "خطا در حذف آدرس");
      }

      toast.success("آدرس با موفقیت حذف شد.");
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error) || "خطا در حذف آدرس");
    } finally {
      setDeletingId(null);
    }
  }

  function confirmDelete(address: Address) {
    toast(`آیا از حذف آدرس «${address.title}» مطمئن هستید؟`, {
      description: "این عملیات غیرقابل بازگشت است.",
      duration: 8000,
      action: {
        label: "حذف کن",
        onClick: () => performDelete(address.id),
      },
      cancel: {
        label: "انصراف",
        onClick: () => {},
      },
    });
  }

  return (
    <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-white p-4 sm:p-8 shadow-sm">
      <div className="mb-4 sm:mb-6 flex items-center gap-2.5 sm:gap-3">
        <div className="rounded-xl sm:rounded-2xl bg-pink-100 p-2 sm:p-3 text-pink-600">
          <MapPin className="h-4 w-4 sm:h-[22px] sm:w-[22px]" />
        </div>
        <div>
          <h2 className="text-base sm:text-xl font-bold text-gray-900">آدرس‌های کاربر</h2>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            {addresses.length.toLocaleString("fa-IR")} آدرس ثبت شده
          </p>
        </div>
      </div>

      {addresses.length === 0 ? (
        <p className="rounded-xl sm:rounded-2xl bg-gray-50 py-8 sm:py-10 text-center text-xs sm:text-sm text-gray-500">
          این کاربر هیچ آدرسی ثبت نکرده است.
        </p>
      ) : (
        <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
          {addresses.map((address) => {
            const isDeleting = deletingId === address.id;

            return (
              <div
                key={address.id}
                className={`rounded-xl sm:rounded-2xl border p-3 sm:p-5 transition ${address.isDefault ? "border-pink-200 bg-pink-50/40" : "border-gray-100"}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-bold text-gray-900">
                      {address.title}
                    </span>

                    {address.isDefault && (
                      <span className="flex items-center gap-1 rounded-full bg-pink-100 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-pink-600">
                        <Star className="h-2.5 w-2.5 fill-pink-500" />
                        پیش‌فرض
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={() => confirmDelete(address)}
                    className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                    aria-label="حذف آدرس"
                  >
                    {isDeleting ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600">
                  {address.receiverName} — {address.receiverPhone}
                </p>

                <p className="mt-1.5 text-xs sm:text-sm leading-5 sm:leading-6 text-gray-500">
                  {address.province}، {address.city}، {address.addressLine}
                  {address.plaque ? ` - پلاک ${address.plaque}` : ""}
                  {address.unit ? ` - واحد ${address.unit}` : ""}
                </p>

                {address.postalCode && (
                  <p className="mt-1 text-[11px] sm:text-xs text-gray-400">
                    کد پستی: {address.postalCode}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}