import CategoriesHeader from "@/app/features/admin/components/categories/CategoriesHeader";
import CategoryStatistics from "@/app/features/admin/components/categories/CategoryStatistics";
import CategoriesTable from "@/app/features/admin/components/categories/CategoriesTable";

export default function CategoriesPage() {
  return (
    <div className="space-y-6">

      {/* Header */}

      <CategoriesHeader />

      {/* Statistics */}

      <CategoryStatistics />

      {/* Table */}

      <CategoriesTable />

    </div>
  );
}