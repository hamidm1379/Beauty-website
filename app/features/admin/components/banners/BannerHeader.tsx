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
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">مدیریت بنرها</h1>

          <p className="mt-1 text-xs text-gray-500 sm:mt-2 sm:text-sm">
            مدیریت اسلایدرها و بنرهای صفحات مختلف سایت
          </p>
        </div>

        <Link
          href="/admin/banners/create"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-pink-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-pink-700 sm:gap-2 sm:rounded-2xl sm:px-6 sm:py-3 sm:text-base"
        >
          <Plus size={18} className="sm:hidden" />
          <Plus size={20} className="hidden sm:block" />
          افزودن بنر
        </Link>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
        {/* Total */}

        <div className="col-span-2 rounded-2xl bg-white p-3 shadow-sm sm:col-span-1 sm:rounded-3xl sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 sm:text-sm">کل بنرها</p>

              <h2 className="mt-1 text-lg font-bold sm:mt-2 sm:text-3xl">
                {totalBanners.toLocaleString("fa-IR")}
              </h2>
            </div>

            <div className="rounded-xl bg-pink-100 p-2.5 text-pink-600 sm:rounded-2xl sm:p-4">
              <ImageIcon size={22} className="sm:hidden" />
              <ImageIcon size={28} className="hidden sm:block" />
            </div>
          </div>
        </div>

        {/* Active */}

        <div className="rounded-2xl bg-white p-3 shadow-sm sm:rounded-3xl sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 sm:text-sm">بنرهای فعال</p>

              <h2 className="mt-1 text-lg font-bold text-green-600 sm:mt-2 sm:text-3xl">
                {activeBanners.toLocaleString("fa-IR")}
              </h2>
            </div>

            <div className="rounded-xl bg-green-100 p-2.5 text-green-600 sm:rounded-2xl sm:p-4">
              <CheckCircle2 size={22} className="sm:hidden" />
              <CheckCircle2 size={28} className="hidden sm:block" />
            </div>
          </div>
        </div>

        {/* Inactive */}

        <div className="rounded-2xl bg-white p-3 shadow-sm sm:rounded-3xl sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 sm:text-sm">بنرهای غیرفعال</p>

              <h2 className="mt-1 text-lg font-bold text-red-600 sm:mt-2 sm:text-3xl">
                {inactiveBanners.toLocaleString("fa-IR")}
              </h2>
            </div>

            <div className="rounded-xl bg-red-100 p-2.5 text-red-600 sm:rounded-2xl sm:p-4">
              <XCircle size={22} className="sm:hidden" />
              <XCircle size={28} className="hidden sm:block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}