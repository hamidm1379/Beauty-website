import BrandsHeader from "@/app/features/admin/components/brands/BrandsHeader";
import BrandStatistics from "@/app/features/admin/components/brands/BrandStatistics";
import BrandsTable from "@/app/features/admin/components/brands/BrandsTable";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function BrandsPage() {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect("/admin/orders");
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <BrandsHeader />

      {/* Statistics */}

      <BrandStatistics />

      {/* Table */}

      <BrandsTable />

    </div>
  );
}