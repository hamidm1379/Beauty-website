"use client";

import { Loader2, Save, X } from "lucide-react";

interface BannerActionsProps {
  loading: boolean;
  mode: "create" | "edit";
  onCancel: () => void;
}

export default function BannerActions({
  loading,
  mode,
  onCancel,
}: BannerActionsProps) {
  return (
    <div className="sticky bottom-6 z-20">
      <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl backdrop-blur lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}

        <div>
          <h3 className="text-lg font-bold">
            {mode === "create"
              ? "ایجاد بنر جدید"
              : "ویرایش بنر"}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            قبل از ذخیره اطلاعات را بررسی کنید.
          </p>
        </div>

        {/* Right */}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="
              inline-flex
              items-center
              gap-2
              rounded-2xl
              border
              border-gray-300
              px-6
              py-3
              font-medium
              transition
              hover:bg-gray-100
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X size={18} />

            انصراف
          </button>

          <button
            type="submit"
            disabled={loading}
            className="
              inline-flex
              items-center
              gap-2
              rounded-2xl
              bg-pink-600
              px-6
              py-3
              font-medium
              text-white
              transition
              hover:bg-pink-700
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />

                در حال ذخیره...
              </>
            ) : (
              <>
                <Save size={18} />

                {mode === "create"
                  ? "ایجاد بنر"
                  : "ذخیره تغییرات"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}