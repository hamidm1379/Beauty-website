"use client";

import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
        <p className="text-sm text-gray-500">در حال بارگذاری...</p>
      </div>
    </div>
  );
}
