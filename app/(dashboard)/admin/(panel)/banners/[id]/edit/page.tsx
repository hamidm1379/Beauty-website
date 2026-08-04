import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import BannerForm from "@/app/features/admin/components/banners/BannerForm";

import { bannerService } from "@/lib/services/banner.service";

interface EditBannerPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: EditBannerPageProps) {
  const { id } = await params;

  try {
    const banner = await bannerService.getById(Number(id));

    return {
      title: `ویرایش ${banner.title}`,
    };
  } catch {
    return {
      title: "ویرایش بنر",
    };
  }
}

export default async function EditBannerPage({
  params,
}: EditBannerPageProps) {
  const { id } = await params;

  let banner;

  try {
    banner = await bannerService.getById(Number(id));
  } catch {
    notFound();
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Breadcrumb */}

      <div className="flex items-center gap-1.5 text-xs text-gray-500 sm:gap-2 sm:text-sm">
        <Link href="/admin/banners" className="transition hover:text-pink-600">
          بنرها
        </Link>

        <ChevronRight size={14} className="sm:hidden" />
        <ChevronRight size={16} className="hidden sm:block" />

        <span className="font-medium text-gray-900">ویرایش بنر</span>
      </div>

      {/* Header */}

      <div className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-8">
        <h1 className="text-xl font-bold sm:text-3xl">ویرایش بنر</h1>

        <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-base">
          اطلاعات بنر را ویرایش کنید و تغییرات را ذخیره نمایید.
        </p>
      </div>

      {/* Form */}

      <BannerForm
        mode="edit"
        initialData={{
          ...banner,
          startDate: banner.startDate ? banner.startDate.toISOString() : null,
          endDate: banner.endDate ? banner.endDate.toISOString() : null,
        }}
      />
    </div>
  );
}