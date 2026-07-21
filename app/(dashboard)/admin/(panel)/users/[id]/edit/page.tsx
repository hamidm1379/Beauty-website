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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold">
            <div className="rounded-2xl bg-blue-100 p-3 text-blue-600">
              <UserCog size={28} />
            </div>
            ویرایش کاربر
          </h1>

          <p className="mt-2 text-gray-500">
            اطلاعات کاربر را ویرایش کنید.
          </p>
        </div>

        <Link
          href="/admin/users"
          className="flex h-11 items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 transition hover:bg-gray-50"
        >
          <ArrowRight size={18} />
          بازگشت
        </Link>
      </div>

      {/* Stats */}
      <AdminUserStats stats={overview._count} />

      {/* Form */}
      <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
        <UserForm mode="edit" user={user} />
      </div>

      {/* Addresses */}
      <AdminUserAddresses userId={userId} addresses={overview.addresses} />
    </div>
  );
}