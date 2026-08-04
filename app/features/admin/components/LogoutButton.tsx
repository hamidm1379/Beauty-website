"use client";

import { useTransition } from "react";
import { LogOut } from "lucide-react";

import { logoutAction } from "@/app/(dashboard)/admin/logout/actions";

export default function LogoutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          await logoutAction();
        })
      }
      disabled={pending}
      className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50 sm:gap-3 sm:px-4 sm:py-3 sm:text-base"
    >
      <LogOut size={16} className="sm:hidden" />
      <LogOut size={18} className="hidden sm:block" />

      {pending ? "در حال خروج..." : "خروج از حساب"}
    </button>
  );
}