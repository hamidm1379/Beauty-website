import Image from "next/image";
import Link from "next/link";

import { Banner } from "@prisma/client";
import { Pencil } from "lucide-react";

import DeleteBannerModal from "@/app/features/admin/components/banners/DeleteBannerModal";

interface BannersTableProps {
  banners: Banner[];
}

function PositionBadge({ position }: { position: Banner["position"] }) {
  const labels: Record<Banner["position"], string> = {
    HOME_HERO: "اسلایدر اصلی",
    HOME_TOP: "بالای صفحه",
    HOME_MIDDLE: "وسط صفحه",
    HOME_BOTTOM: "پایین صفحه",
    SIDEBAR: "سایدبار",
    CATEGORY: "دسته‌بندی",
  };

  return (
    <span className="whitespace-nowrap rounded-lg bg-blue-100 px-2 py-0.5 text-xs text-blue-700 sm:rounded-xl sm:px-3 sm:py-1 sm:text-sm">
      {labels[position]}
    </span>
  );
}

function ActiveBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`whitespace-nowrap rounded-lg px-2 py-0.5 text-xs font-medium sm:rounded-xl sm:px-3 sm:py-1 sm:text-sm ${
        active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {active ? "فعال" : "غیرفعال"}
    </span>
  );
}

export default function BannersTable({ banners }: BannersTableProps) {
  if (banners.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center text-sm text-gray-500 shadow-sm sm:rounded-3xl sm:p-20 sm:text-base">
        هیچ بنری یافت نشد.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-sm sm:rounded-3xl">
      <table className="w-full min-w-[820px] text-sm sm:text-base">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="px-3 py-2.5 text-right whitespace-nowrap sm:px-6 sm:py-4">بنر</th>
            <th className="px-3 py-2.5 text-center whitespace-nowrap sm:px-6 sm:py-4">محل نمایش</th>
            <th className="px-3 py-2.5 text-center whitespace-nowrap sm:px-6 sm:py-4">ترتیب</th>
            <th className="px-3 py-2.5 text-center whitespace-nowrap sm:px-6 sm:py-4">وضعیت</th>
            <th className="px-3 py-2.5 text-center whitespace-nowrap sm:px-6 sm:py-4">زمان نمایش</th>
            <th className="px-3 py-2.5 text-center whitespace-nowrap sm:px-6 sm:py-4">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {banners.map((banner) => (
            <tr
              key={banner.id}
              className="border-b transition hover:bg-gray-50"
            >
              {/* Banner */}

              <td className="px-3 py-3 sm:px-6 sm:py-5">
                <div className="flex items-center gap-2.5 sm:gap-4">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    width={120}
                    height={70}
                    className="h-11 w-20 shrink-0 rounded-lg border object-cover sm:h-16 sm:w-28 sm:rounded-xl"
                  />

                  <div className="whitespace-nowrap">
                    <h3 className="font-semibold">{banner.title}</h3>

                    {banner.subtitle && (
                      <p className="mt-1 text-xs text-gray-500">
                        {banner.subtitle}
                      </p>
                    )}

                    {banner.buttonText && (
                      <span className="mt-1.5 inline-flex rounded-lg bg-pink-100 px-2 py-0.5 text-[11px] text-pink-700 sm:mt-2 sm:py-1 sm:text-xs">
                        {banner.buttonText}
                      </span>
                    )}
                  </div>
                </div>
              </td>

              {/* Position */}

              <td className="px-3 py-3 text-center whitespace-nowrap sm:px-6 sm:py-5">
                <PositionBadge position={banner.position} />
              </td>

              {/* Sort */}

              <td className="px-3 py-3 text-center font-semibold whitespace-nowrap sm:px-6 sm:py-5">
                {banner.order}
              </td>

              {/* Active */}

              <td className="px-3 py-3 text-center whitespace-nowrap sm:px-6 sm:py-5">
                <ActiveBadge active={banner.status === "ACTIVE"} />
              </td>

              {/* Schedule */}

              <td className="px-3 py-3 text-center text-xs whitespace-nowrap text-gray-500 sm:px-6 sm:py-5 sm:text-sm">
                {banner.startDate
                  ? new Date(banner.startDate).toLocaleDateString("fa-IR")
                  : "-"}

                {" تا "}

                {banner.endDate
                  ? new Date(banner.endDate).toLocaleDateString("fa-IR")
                  : "∞"}
              </td>

              {/* Actions */}

              <td className="px-3 py-3 sm:px-6 sm:py-5">
                <div className="flex justify-center gap-2 sm:gap-3">
                  <Link
                    href={`/admin/banners/${banner.id}/edit`}
                    className="rounded-lg bg-blue-50 p-1.5 text-blue-600 transition hover:bg-blue-100 sm:rounded-xl sm:p-2"
                  >
                    <Pencil size={16} className="sm:hidden" />
                    <Pencil size={18} className="hidden sm:block" />
                  </Link>

                  <DeleteBannerModal
                    bannerId={banner.id}
                    bannerTitle={banner.title}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}