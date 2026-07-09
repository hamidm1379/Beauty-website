"use client";

import { Search, RefreshCcw, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function UsersToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");

    startTransition(() => {
      router.push(`/admin/users?${params.toString()}`);
    });
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            defaultValue={searchParams.get("search") ?? ""}
            onChange={(e) => updateQuery("search", e.target.value)}
            placeholder="جستجوی نام، موبایل یا ایمیل..."
            className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 pr-11 pl-4 outline-none transition focus:border-pink-500 focus:bg-white"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">

          <select
            defaultValue={searchParams.get("role") ?? ""}
            onChange={(e) => updateQuery("role", e.target.value)}
            className="h-12 rounded-2xl border border-gray-200 bg-white px-4 outline-none transition focus:border-pink-500"
          >
            <option value="">همه نقش‌ها</option>
            <option value="ADMIN">مدیر</option>
            <option value="CUSTOMER">کاربر</option>
          </select>

          <select
            defaultValue={searchParams.get("status") ?? ""}
            onChange={(e) => updateQuery("status", e.target.value)}
            className="h-12 rounded-2xl border border-gray-200 bg-white px-4 outline-none transition focus:border-pink-500"
          >
            <option value="">همه وضعیت‌ها</option>
            <option value="active">فعال</option>
            <option value="inactive">غیرفعال</option>
          </select>

          <button
            onClick={() => router.refresh()}
            disabled={isPending}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 transition hover:bg-pink-50 disabled:opacity-50"
          >
            <RefreshCcw
              size={18}
              className={isPending ? "animate-spin" : ""}
            />
          </button>

        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
        <Users size={16} className="text-pink-500" />

        <span>نمایش کاربران فروشگاه</span>
      </div>
    </div>
  );
}