"use client";

import { Settings, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SettingsHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
          <Settings size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-black text-gray-900 sm:text-3xl">
            تنظیمات فروشگاه
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            مدیریت تنظیمات عمومی، SEO و شبکه‌های اجتماعی
          </p>
        </div>
      </div>

      <Link
        href="/admin"
        className="inline-flex items-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 sm:self-auto"
      >
        <ArrowRight size={16} />
        بازگشت
      </Link>
    </div>
  );
}
