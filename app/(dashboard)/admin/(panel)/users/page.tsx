import { userService } from "@/lib/services/user.service";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import UsersHeader from "@/app/features/admin/components/users/UsersHeader";
import UsersToolbar from "@/app/features/admin/components/users/UsersToolbar";
import UsersTable from "@/app/features/admin/components/users/UsersTable";
import UserPagination from "@/app/features/admin/components/users/UserPagination";
import UserStats from "@/app/features/admin/components/users/UserStats";

interface UsersPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    role?: string;
    status?: string;
  }>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect("/admin/orders");
  }

  const params = await searchParams;

  const page = Number(params.page ?? 1);

  const [result, stats] = await Promise.all([
    userService.getUsers({
      page,
      limit: 10,
      search: params.search,
    }),

    userService.getStats(),
  ]);

  return (
    <div className="space-y-6">
      <UsersHeader />
      <UserStats stats={stats} />
      <UsersToolbar />

      <UsersTable users={result.users} />

      <UserPagination page={result.page} totalPages={result.totalPages} />
    </div>
  );
}
