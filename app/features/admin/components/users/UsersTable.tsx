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
  role: "ADMIN" | "CUSTOMER";
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
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr className="text-right text-sm text-gray-500">
              <th className="px-6 py-4">کاربر</th>
              <th className="px-6 py-4">نام کاربری</th>
              <th className="px-6 py-4">شماره موبایل</th>
              <th className="px-6 py-4">ایمیل</th>
              <th className="px-6 py-4">نقش</th>
              <th className="px-6 py-4">وضعیت</th>
              <th className="px-6 py-4">عضویت</th>
              <th className="px-6 py-4 text-center">عملیات</th>
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
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      {user.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.firstName}
                          width={46}
                          height={46}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-100 font-bold text-pink-600">
                          {user.firstName.charAt(0)}
                        </div>
                      )}

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {user.firstName}
                          {user.lastName && ` ${user.lastName}`}
                        </h3>
                        <p className="text-sm text-gray-500">#{user.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Username */}
                  <td className="px-6 py-5">{user.username ?? "-"}</td>

                  {/* Phone */}
                  <td className="px-6 py-5">{user.phone}</td>

                  {/* Email */}
                  <td className="px-6 py-5">{user.email ?? "-"}</td>

                  {/* Role */}
                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.role === "ADMIN"
                          ? "bg-violet-100 text-violet-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role === "ADMIN" ? "مدیر" : "کاربر"}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.isActive ? "فعال" : "غیرفعال"}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5 text-gray-500">
                    {new Intl.DateTimeFormat("fa-IR").format(
                      new Date(user.createdAt)
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-2">
                      {/* <Link
                        href={`/admin/users/${user.id}`}
                        className="rounded-xl p-2 transition hover:bg-gray-100"
                      >
                        <Eye size={18} />
                      </Link> */}

                      <Link
                        href={`/admin/users/${user.id}/edit`}
                        className="rounded-xl p-2 transition hover:bg-blue-100"
                      >
                        <Edit size={18} />
                      </Link>

                      <button
                        type="button"
                        disabled={isDeleting}
                        onClick={() => confirmDelete(user)}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-red-600 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isDeleting ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <Trash2 size={18} />
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