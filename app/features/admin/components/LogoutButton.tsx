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
      className="
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        px-4
        py-3
        text-red-600
        transition
        hover:bg-red-50
      "
    >
      <LogOut size={18} />

      {pending ? "در حال خروج..." : "خروج از حساب"}
    </button>
  );
}