"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>

        <h2 className="text-lg font-bold text-gray-900">
          خطایی رخ داد
        </h2>

        <p className="max-w-md text-sm text-gray-500">
          متأسفیم، مشکلی در بارگذاری این بخش پیش آمد. لطفاً دوباره تلاش کنید.
        </p>

        {error?.digest && (
          <p className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs text-gray-400" dir="ltr">
            {error.digest}
          </p>
        )}

        <button
          onClick={() => reset()}
          className="mt-2 flex items-center gap-2 rounded-xl bg-pink-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-pink-600"
        >
          <RefreshCw className="h-4 w-4" />
          تلاش مجدد
        </button>
      </div>
    </div>
  );
}
