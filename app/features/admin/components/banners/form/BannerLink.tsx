"use client";

import { Globe } from "lucide-react";

interface BannerLinkProps {
  form: {
    link: string;
  };

  updateField: (name: string, value: string | number | File | null) => void;
}

export default function BannerLink({
  form,
  updateField,
}: BannerLinkProps) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-8">
      <div className="mb-4 sm:mb-8">
        <h2 className="text-base font-bold sm:text-xl">لینک بنر</h2>

        <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
          آدرسی که کاربر پس از کلیک روی بنر به آن منتقل می‌شود.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Link */}

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
            لینک مقصد
          </label>

          <div className="relative">
            <Globe size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 sm:left-4 sm:size-[18px]" />

            <input
              type="url"
              value={form.link}
              onChange={(e) => updateField("link", e.target.value)}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-gray-200 py-2 pr-3 pl-9 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100 sm:rounded-xl sm:py-3 sm:pr-4 sm:pl-11 sm:text-base"
            />
          </div>

          <p className="mt-1.5 text-[11px] text-gray-500 sm:mt-2 sm:text-xs">
            می‌توانید لینک صفحه محصول، دسته‌بندی، مقاله یا هر آدرس خارجی را وارد کنید.
          </p>
        </div>

        {/* Preview */}

        {form.link && (
          <div className="rounded-xl border border-green-200 bg-green-50 p-3 sm:rounded-2xl sm:p-4">
            <div className="mb-1 text-xs font-semibold text-green-700 sm:text-sm">
              پیش‌نمایش لینک
            </div>

            <a
              href={form.link}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-xs text-blue-600 hover:underline sm:text-sm"
            >
              {form.link}
            </a>
          </div>
        )}

        {/* Info */}

        <div className="rounded-xl bg-gray-50 p-3 text-xs text-gray-500 sm:rounded-2xl sm:p-4 sm:text-sm">
          <ul className="list-disc space-y-1 pr-4 sm:pr-5">
            <li>برای صفحات داخلی نیز می‌توانید آدرس کامل وارد کنید.</li>
            <li>در صورت خالی بودن، کلیک روی بنر غیرفعال خواهد بود.</li>
            <li>پیشنهاد می‌شود از HTTPS استفاده کنید.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}