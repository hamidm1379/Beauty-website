import AdminHeader from "@/app/features/admin/components/AdminHeader";
import AdminSidebar from "@/app/features/admin/components/AdminSidebar";
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
    <div className="flex-1 lg:mr-72.5">
      <AdminHeader />
      <main
        className="
       space-y-8 p-6 lg:p-8
      "
      >
        <AdminSidebar />
        <LayoutProvider>{children}</LayoutProvider>
      </main>
    </div>
  );
}
