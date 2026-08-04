import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, UserCog } from "lucide-react";

import UserForm from "@/app/features/admin/components/users/UserForm";
import AdminUserStats from "@/app/features/admin/components/users/AdminUserStats";
import AdminUserAddresses from "@/app/features/admin/components/users/AdminUserAddresses";

import { userService } from "@/lib/services/user.service";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditUserPage({ params }: Props) {
  const { id } = await params;

  const userId = Number(id);

  const [user, overview] = await Promise.all([
    userService.getUser(userId),
    userService.getUserOverview(userId),
  ]);

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-5 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-3xl font-bold">
            <div className="rounded-xl sm:rounded-2xl bg-blue-100 p-2 sm:p-3 text-blue-600">
              <UserCog className="h-5 w-5 sm:h-7 sm:w-7" />
            </div>
            ویرایش کاربر
          </h1>

          <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-gray-500">
            اطلاعات کاربر را ویرایش کنید.
          </p>
        </div>

        <Link
          href="/admin/users"
          className="flex h-9 sm:h-11 items-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl border border-gray-200 bg-white px-3 sm:px-5 text-xs sm:text-sm transition hover:bg-gray-50"
        >
          <ArrowRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          بازگشت
        </Link>
      </div>

      {/* Stats */}
      <AdminUserStats stats={overview._count} />

      {/* Form */}
      <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-white p-4 sm:p-8 shadow-sm">
        <UserForm mode="edit" user={user} />
      </div>

      {/* Addresses */}
      <AdminUserAddresses userId={userId} addresses={overview.addresses} />
    </div>
  );
}