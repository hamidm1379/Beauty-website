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
    <div className="bottom-3 z-20 sm:bottom-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl backdrop-blur sm:gap-4 sm:rounded-3xl sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}

        <div>
          <h3 className="text-base font-bold sm:text-lg">
            {mode === "create" ? "ایجاد بنر جدید" : "ویرایش بنر"}
          </h3>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            قبل از ذخیره اطلاعات را بررسی کنید.
          </p>
        </div>

        {/* Right */}

        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:gap-2 sm:rounded-2xl sm:px-6 sm:py-3 sm:text-base"
          >
            <X size={16} className="sm:hidden" />
            <X size={18} className="hidden sm:block" />
            انصراف
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex flex-1 items-center justify-center gap-0.5 rounded-xl bg-pink-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none sm:gap-2 sm:rounded-2xl sm:px-6 sm:py-3 sm:text-base"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin sm:hidden" />
                <Loader2 size={18} className="hidden animate-spin sm:block" />
                در حال ذخیره...
              </>
            ) : (
              <>
                <Save size={16} className="sm:hidden" />
                <Save size={18} className="hidden sm:block" />
                {mode === "create" ? "ایجاد بنر" : "ذخیره تغییرات"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}