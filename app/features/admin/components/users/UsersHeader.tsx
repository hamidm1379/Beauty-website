import Link from "next/link";
import { Plus, Users } from "lucide-react";

export default function UsersHeader() {
  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-pink-500 to-rose-500 text-white shadow-lg">
          <Users size={30} />
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            کاربران
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            مدیریت کاربران فروشگاه، نقش‌ها و وضعیت حساب‌ها
          </p>
        </div>
      </div>

      <Link
        href="/admin/users/new"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-pink-500 to-rose-500 px-6 font-medium text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
      >
        <Plus size={18} />

        افزودن کاربر
      </Link>
    </div>
  );
}