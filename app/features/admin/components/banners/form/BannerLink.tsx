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
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-bold">
          لینک بنر
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          آدرسی که کاربر پس از کلیک روی بنر به آن منتقل می‌شود.
        </p>
      </div>

      <div className="space-y-6">
        {/* Link */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            لینک مقصد
          </label>

          <div className="relative">
            <Globe
              size={18}
              className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
            />

            <input
              type="url"
              value={form.link}
              onChange={(e) =>
                updateField("link", e.target.value)
              }
              placeholder="https://example.com"
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                py-3
                pr-4
                pl-11
                outline-none
                transition
                focus:border-pink-500
                focus:ring-2
                focus:ring-pink-100
              "
            />
          </div>

          <p className="mt-2 text-xs text-gray-500">
            می‌توانید لینک صفحه محصول، دسته‌بندی، مقاله یا هر آدرس خارجی را وارد کنید.
          </p>
        </div>

        {/* Preview */}

        {form.link && (
          <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
            <div className="mb-1 text-sm font-semibold text-green-700">
              پیش‌نمایش لینک
            </div>

            <a
              href={form.link}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-sm text-blue-600 hover:underline"
            >
              {form.link}
            </a>
          </div>
        )}

        {/* Info */}

        <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-500">
          <ul className="list-disc space-y-1 pr-5">
            <li>برای صفحات داخلی نیز می‌توانید آدرس کامل وارد کنید.</li>
            <li>در صورت خالی بودن، کلیک روی بنر غیرفعال خواهد بود.</li>
            <li>پیشنهاد می‌شود از HTTPS استفاده کنید.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}