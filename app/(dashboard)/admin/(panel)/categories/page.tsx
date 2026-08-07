import CategoriesHeader from "@/app/features/admin/components/categories/CategoriesHeader";
import CategoryStatistics from "@/app/features/admin/components/categories/CategoryStatistics";
import CategoriesTable from "@/app/features/admin/components/categories/CategoriesTable";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CategoriesPage() {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect("/admin/orders");
  }

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