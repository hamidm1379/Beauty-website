"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import { Edit, Eye, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/errors";

interface User {
  id: number;
  firstName: string;
  lastName: string | null;
  username: string | null;
  email: string | null;
  phone: string;
  avatar: string | null;
  role: "ADMIN" | "CUSTOMER" | "SUPPORT";
  isActive: boolean;
  createdAt: Date;
}

interface Props {
  users: User[];
}

export default function UsersTable({ users }: Props) {
  const router = useRouter();

  // شناسه کاربری که در حال حذف است (برای نمایش لودینگ فقط روی همان ردیف)
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const performDelete = async (userId: number) => {
    try {
      setDeletingId(userId);

      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success("کاربر با موفقیت حذف شد.");
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error) || "خطا در حذف کاربر");
    } finally {
      setDeletingId(null);
    }
  };

  const confirmDelete = (user: User) => {
    toast(
      `آیا از حذف «${user.firstName}${user.lastName ? ` ${user.lastName}` : ""}» مطمئن هستید؟`,
      {
        description: "این عملیات غیرقابل بازگشت است.",
        duration: 8000,
        action: {
          label: "حذف کن",
          onClick: () => performDelete(user.id),
        },
        cancel: {
          label: "انصراف",
          onClick: () => {},
        },
      }
    );
  };

  return (
    <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full">
          <thead className="bg-gray-50">
            <tr className="text-right text-xs sm:text-sm text-gray-500">
              <th className="px-3 py-2.5 sm:px-6 sm:py-4">کاربر</th>
              <th className="px-3 py-2.5 sm:px-6 sm:py-4">نام کاربری</th>
              <th className="px-3 py-2.5 sm:px-6 sm:py-4">شماره موبایل</th>
              <th className="px-3 py-2.5 sm:px-6 sm:py-4">ایمیل</th>
              <th className="px-3 py-2.5 sm:px-6 sm:py-4">نقش</th>
              <th className="px-3 py-2.5 sm:px-6 sm:py-4">وضعیت</th>
              <th className="px-3 py-2.5 sm:px-6 sm:py-4">عضویت</th>
              <th className="px-3 py-2.5 sm:px-6 sm:py-4 text-center">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              const isDeleting = deletingId === user.id;

              return (
                <tr
                  key={user.id}
                  className="border-t transition hover:bg-rose-50/40"
                >
                  {/* User */}
                  <td className="px-3 py-3 sm:px-6 sm:py-5">
                    <div className="flex items-center gap-2 sm:gap-3">
                      {user.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.firstName}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-pink-600">
                          {user.firstName.charAt(0)}
                        </div>
                      )}

                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-900">
                          {user.firstName}
                          {user.lastName && ` ${user.lastName}`}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-gray-500">#{user.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Username */}
                  <td className="px-3 py-3 sm:px-6 sm:py-5 text-xs sm:text-sm">{user.username ?? "-"}</td>

                  {/* Phone */}
                  <td className="px-3 py-3 sm:px-6 sm:py-5 text-xs sm:text-sm">{user.phone}</td>

                  {/* Email */}
                  <td className="px-3 py-3 sm:px-6 sm:py-5 text-xs sm:text-sm">{user.email ?? "-"}</td>

                  {/* Role */}
                  <td className="px-3 py-3 sm:px-6 sm:py-5">
                    <span className={`rounded-full px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold ${
                      user.role === "ADMIN"
                        ? "bg-violet-100 text-violet-700"
                        : user.role === "SUPPORT"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {user.role === "ADMIN" ? "مدیر" : user.role === "SUPPORT" ? "پشتیبانی" : "کاربر"}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-3 py-3 sm:px-6 sm:py-5">
                    <span className={`rounded-full px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold ${user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {user.isActive ? "فعال" : "غیرفعال"}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-3 py-3 sm:px-6 sm:py-5 text-xs sm:text-sm text-gray-500">
                    {new Intl.DateTimeFormat("fa-IR").format(
                      new Date(user.createdAt)
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-3 py-3 sm:px-6 sm:py-5">
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                      {/* <Link
                        href={`/admin/users/${user.id}`}
                        className="rounded-xl p-2 transition hover:bg-gray-100"
                      >
                        <Eye size={18} />
                      </Link> */}

                      <Link
                        href={`/admin/users/${user.id}/edit`}
                        className="rounded-lg sm:rounded-xl p-1.5 sm:p-2 transition hover:bg-blue-100"
                      >
                        <Edit className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                      </Link>

                      <button
                        type="button"
                        disabled={isDeleting}
                        onClick={() => confirmDelete(user)}
                        className="flex h-8 w-8 sm:h-10 sm:w-10 cursor-pointer items-center justify-center rounded-lg sm:rounded-xl bg-red-600 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isDeleting ? (
                          <Loader2 className="h-4 w-4 sm:h-[18px] sm:w-[18px] animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}