import Link from "next/link";
import { Plus, Users } from "lucide-react";

export default function UsersHeader() {
  return (
    <div className="flex flex-col gap-4 sm:gap-5 rounded-2xl sm:rounded-3xl border border-gray-100 bg-white p-4 sm:p-8 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3 sm:gap-5">
        <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-linear-to-br from-pink-500 to-rose-500 text-white shadow-lg">
          <Users className="h-6 w-6 sm:h-[30px] sm:w-[30px]" />
        </div>

        <div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-gray-900">
            کاربران
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            مدیریت کاربران فروشگاه، نقش‌ها و وضعیت حساب‌ها
          </p>
        </div>
      </div>

      <Link
        href="/admin/users/new"
        className="inline-flex h-10 sm:h-12 items-center justify-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl bg-linear-to-r from-pink-500 to-rose-500 px-4 sm:px-6 text-sm sm:text-base font-medium text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
      >
        <Plus className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />

        افزودن کاربر
      </Link>
    </div>
  );
}