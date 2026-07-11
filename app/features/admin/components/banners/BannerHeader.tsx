import Link from "next/link";

import {
  ImageIcon,
  CheckCircle2,
  XCircle,
  Plus,
} from "lucide-react";

interface BannerHeaderProps {
  totalBanners: number;
  activeBanners: number;
  inactiveBanners: number;
}

export default function BannerHeader({
  totalBanners,
  activeBanners,
  inactiveBanners,
}: BannerHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            مدیریت بنرها
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            مدیریت اسلایدرها و بنرهای صفحات مختلف سایت
          </p>
        </div>

        <Link
          href="/admin/banners/create"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-pink-600
            px-6
            py-3
            font-medium
            text-white
            transition
            hover:bg-pink-700
          "
        >
          <Plus size={20} />

          افزودن بنر
        </Link>
      </div>

      {/* Statistics */}

      <div className="grid gap-5 md:grid-cols-3">
        {/* Total */}

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                کل بنرها
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {totalBanners.toLocaleString("fa-IR")}
              </h2>
            </div>

            <div className="rounded-2xl bg-pink-100 p-4 text-pink-600">
              <ImageIcon size={28} />
            </div>
          </div>
        </div>

        {/* Active */}

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                بنرهای فعال
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {activeBanners.toLocaleString("fa-IR")}
              </h2>
            </div>

            <div className="rounded-2xl bg-green-100 p-4 text-green-600">
              <CheckCircle2 size={28} />
            </div>
          </div>
        </div>

        {/* Inactive */}

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                بنرهای غیرفعال
              </p>

              <h2 className="mt-2 text-3xl font-bold text-red-600">
                {inactiveBanners.toLocaleString("fa-IR")}
              </h2>
            </div>

            <div className="rounded-2xl bg-red-100 p-4 text-red-600">
              <XCircle size={28} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}