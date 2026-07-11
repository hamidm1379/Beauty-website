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
          ویرایش بنر
        </span>
      </div>

      {/* Header */}

      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">
          ویرایش بنر
        </h1>

        <p className="mt-2 text-gray-500">
          اطلاعات بنر را ویرایش کنید و تغییرات را ذخیره نمایید.
        </p>
      </div>

      {/* Form */}

      <BannerForm
        mode="edit"
        initialData={banner}
      />
    </div>
  );
}