import Link from "next/link";
import { ChevronRight } from "lucide-react";

import BannerForm from "@/app/features/admin/components/banners/BannerForm";

export const metadata = {
  title: "ایجاد بنر",
};

export default function CreateBannerPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Breadcrumb */}

      <div className="flex items-center gap-1.5 text-xs text-gray-500 sm:gap-2 sm:text-sm">
        <Link href="/admin/banners" className="transition hover:text-pink-600">
          بنرها
        </Link>

        <ChevronRight size={14} className="sm:hidden" />
        <ChevronRight size={16} className="hidden sm:block" />

        <span className="font-medium text-gray-900">ایجاد بنر</span>
      </div>

      {/* Header */}

      <div className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-8">
        <h1 className="text-xl font-bold sm:text-3xl">ایجاد بنر جدید</h1>

        <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-base">
          اطلاعات بنر را تکمیل کنید. پس از ذخیره، بنر در محل انتخاب‌شده
          قابل نمایش خواهد بود.
        </p>
      </div>

      {/* Form */}

      <BannerForm mode="create" />
    </div>
  );
}