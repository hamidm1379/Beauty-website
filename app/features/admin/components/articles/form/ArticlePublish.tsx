"use client";

import type { ArticleStatus } from "../types";

interface ArticlePublishProps {
  form: {
    status: ArticleStatus;
    publishedAt: string;
  };

  updateField: (name: string, value: string | number | File | null) => void;
}

export default function ArticlePublish({
  form,
  updateField,
}: ArticlePublishProps) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-8">
      <div className="mb-4 sm:mb-8">
        <h2 className="text-base font-bold sm:text-xl">انتشار مقاله</h2>

        <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
          وضعیت نمایش مقاله در سایت را مشخص کنید.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Status */}

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
            وضعیت مقاله
          </label>

          <select
            value={form.status}
            onChange={(e) => updateField("status", e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-pink-500 sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
          >
            <option value="DRAFT">پیش‌نویس</option>

            <option value="PUBLISHED">منتشر شده</option>
          </select>
        </div>

        {/* Publish Date */}

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
            تاریخ انتشار
          </label>

          <input
            type="datetime-local"
            value={form.publishedAt}
            onChange={(e) => updateField("publishedAt", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-pink-500 sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
          />

          <p className="mt-1.5 text-[11px] text-gray-500 sm:mt-2 sm:text-xs">
            اگر خالی باشد، هنگام انتشار از زمان فعلی استفاده خواهد شد.
          </p>
        </div>

        {/* Status Badge */}

        <div className="rounded-xl border bg-gray-50 p-3 sm:rounded-2xl sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium sm:text-base">وضعیت فعلی</span>

            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 sm:text-sm ${
                form.status === "PUBLISHED"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {form.status === "PUBLISHED" ? "منتشر شده" : "پیش‌نویس"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}