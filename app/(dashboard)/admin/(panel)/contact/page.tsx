import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { contactService } from "@/lib/services/contact.service";
import ContactMessagesTable from "@/app/features/admin/components/contact/ContactMessagesTable";

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function AdminContactPage({ searchParams }: Props) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;

  const { items, total, totalPages } = await contactService.getMessages({
    page,
    limit: 20,
  });

  const unreadCount = await contactService.countUnread();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            پیام‌های تماس با ما
          </h1>
          <p className="mt-1 text-gray-500">
            {total.toLocaleString("fa-IR")} پیام ثبت شده،{" "}
            {unreadCount.toLocaleString("fa-IR")} پیام خوانده‌نشده
          </p>
        </div>
      </div>

      <ContactMessagesTable
        messages={items.map((item) => ({
          ...item,
          createdAt: item.createdAt.toISOString(),
        }))}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`?page=${p}`}
              className={`
                flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold
                ${
                  p === page
                    ? "bg-pink-500 text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }
              `}
            >
              {p.toLocaleString("fa-IR")}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}