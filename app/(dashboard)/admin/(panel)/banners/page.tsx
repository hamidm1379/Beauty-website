import BannerHeader from "@/app/features/admin/components/banners/BannerHeader";
import BannerToolbar from "@/app/features/admin/components/banners/BannerToolbar";
import BannersTable from "@/app/features/admin/components/banners/BannersTable";
// import BannerPagination from "@/app/features/admin/components/banners/BannerPagination";

import { bannerService } from "@/lib/services/banner.service";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

interface BannersPageProps {
  searchParams: Promise<{
    search?: string;
    position?: string;
    status?: string;
    page?: string;
    limit?: string;
    sort?: string;
  }>;
}

export default async function BannersPage({
  searchParams,
}: BannersPageProps) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect("/admin/orders");
  }

  const params = await searchParams;

  const filters = {
    search: params.search ?? "",
    position: params.position ?? "",
    status: params.status ?? "",
    sort: params.sort ?? "order",
    page: Number(params.page ?? 1),
    limit: Number(params.limit ?? 10),
  };

  const [bannersData, statistics] = await Promise.all([
    bannerService.getFilteredBanners(filters),
    bannerService.getStatistics(),
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}

      <BannerHeader
        totalBanners={statistics.totalBanners}
        activeBanners={statistics.activeBanners}
        inactiveBanners={statistics.inactiveBanners}
      />

      {/* Toolbar */}

      <BannerToolbar
        filters={filters}
        totalBanners={statistics.totalBanners}
      />

      {/* Table */}

      <BannersTable
        banners={bannersData.items}
      />

      {/* Pagination */}

      
      {/* <BannerPagination
        page={bannersData.page}
        totalPages={bannersData.totalPages}
        totalItems={bannersData.total}
        perPage={filters.limit}
      /> */}
     
    </div>
  );
}