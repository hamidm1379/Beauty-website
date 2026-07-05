import BrandsHeader from "@/app/features/admin/components/brands/BrandsHeader";
import BrandStatistics from "@/app/features/admin/components/brands/BrandStatistics";
import BrandsTable from "@/app/features/admin/components/brands/BrandsTable";

export default function BrandsPage() {
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