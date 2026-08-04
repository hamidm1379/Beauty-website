import AdminHeader from "@/app/features/admin/components/AdminHeader";
import AdminShell from "@/app/features/admin/components/AdminShell";
import LayoutProvider from "@/app/shared/components/LayoutProvider";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "پنل مدیریت",
  description: "پنل مدیریت فروشگاه",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminShell>
      <AdminHeader />
      <main className="space-y-6 p-4 sm:space-y-8 sm:p-6 lg:p-8">
        <LayoutProvider>{children}</LayoutProvider>
      </main>
    </AdminShell>
  );
}
