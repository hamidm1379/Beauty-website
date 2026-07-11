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
    <span className="rounded-xl bg-blue-100 px-3 py-1 text-sm text-blue-700">
      {labels[position]}
    </span>
  );
}

function ActiveBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`rounded-xl px-3 py-1 text-sm font-medium ${
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
      <div className="rounded-3xl bg-white p-20 text-center text-gray-500 shadow-sm">
        هیچ بنری یافت نشد.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <table className="w-full">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-right">بنر</th>

            <th className="px-6 py-4 text-center">محل نمایش</th>

            <th className="px-6 py-4 text-center">ترتیب</th>

            <th className="px-6 py-4 text-center">وضعیت</th>

            <th className="px-6 py-4 text-center">زمان نمایش</th>

            <th className="px-6 py-4 text-center">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {banners.map((banner) => (
            <tr
              key={banner.id}
              className="border-b transition hover:bg-gray-50"
            >
              {/* Banner */}

              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    width={120}
                    height={70}
                    className="h-16 w-28 rounded-xl border object-cover"
                  />

                  <div>
                    <h3 className="font-semibold">{banner.title}</h3>

                    {banner.subtitle && (
                      <p className="mt-1 text-xs text-gray-500">
                        {banner.subtitle}
                      </p>
                    )}

                    {banner.buttonText && (
                      <span className="mt-2 inline-flex rounded-lg bg-pink-100 px-2 py-1 text-xs text-pink-700">
                        {banner.buttonText}
                      </span>
                    )}
                  </div>
                </div>
              </td>

              {/* Position */}

              <td className="px-6 py-5 text-center">
                <PositionBadge position={banner.position} />
              </td>

              {/* Sort */}

              <td className="px-6 py-5 text-center font-semibold">
                {banner.order}
              </td>

              {/* Active */}

              <td className="px-6 py-5 text-center">
                <ActiveBadge active={banner.status === "ACTIVE"} />
              </td>

              {/* Schedule */}

              <td className="px-6 py-5 text-center text-sm text-gray-500">
                {banner.startDate
                  ? new Date(banner.startDate).toLocaleDateString("fa-IR")
                  : "-"}

                {" تا "}

                {banner.endDate
                  ? new Date(banner.endDate).toLocaleDateString("fa-IR")
                  : "∞"}
              </td>

              {/* Actions */}

              <td className="px-6 py-5">
                <div className="flex justify-center gap-3">
                  <Link
                    href={`/admin/banners/${banner.id}/edit`}
                    className="rounded-xl bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                  >
                    <Pencil size={18} />
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
