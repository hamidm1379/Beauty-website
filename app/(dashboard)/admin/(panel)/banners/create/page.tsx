import Link from "next/link";
import { ChevronRight } from "lucide-react";

import BannerForm from "@/app/features/admin/components/banners/BannerForm";

export const metadata = {
  title: "ایجاد بنر",
};

export default function CreateBannerPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link
          href="/admin/banners"
          className="transition hover:text-pink-600"
        >
          بنرها
        </Link>

        <ChevronRight size={16} />

        <span className="font-medium text-gray-900">
          ایجاد بنر
        </span>
      </div>

      {/* Header */}

      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">
          ایجاد بنر جدید
        </h1>

        <p className="mt-2 text-gray-500">
          اطلاعات بنر را تکمیل کنید. پس از ذخیره، بنر در محل انتخاب‌شده
          قابل نمایش خواهد بود.
        </p>
      </div>

      {/* Form */}

      <BannerForm
        mode="create"
      />
    </div>
  );
}