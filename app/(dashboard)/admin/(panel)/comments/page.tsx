import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { reviewService } from "@/lib/services/review.service";
import ReviewsTable from "@/app/features/admin/components/reviews/ReviewsTable";

type Props = {
  searchParams: Promise<{
    page?: string;
    filter?: string;
  }>;
};

export default async function AdminCommentsPage({ searchParams }: Props) {
  const session = await auth();

  if (!session?.user?.id || !["ADMIN", "SUPPORT"].includes(session.user.role as string)) {
    redirect("/");
  }

  const { page: pageParam, filter } = await searchParams;
  const page = Number(pageParam) || 1;

  const isApproved =
    filter === "approved"
      ? true
      : filter === "pending"
        ? false
        : undefined;

  const { items, total, totalPages } = await reviewService.getReviews({
    page,
    limit: 20,
    isApproved,
  });

  const pendingCount = await reviewService.countPending();

  return (
    <div className="mx-auto max-w-4xl px-3 py-5 sm:px-4 sm:py-8">
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-black text-gray-900 sm:text-2xl">دیدگاه‌ها</h1>
          <p className="mt-1 text-xs text-gray-500 sm:text-base">
            {total.toLocaleString("fa-IR")} نظر ثبت شده،{" "}
            {pendingCount.toLocaleString("fa-IR")} نظر در انتظار تایید
          </p>
        </div>

        <div className="flex gap-1.5 overflow-x-auto sm:gap-2">
          <Link
            href="/admin/comments"
            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm ${!filter ? "bg-pink-500 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            همه
          </Link>
          <Link
            href="/admin/comments?filter=pending"
            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm ${filter === "pending" ? "bg-amber-500 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            در انتظار تایید
          </Link>
          <Link
            href="/admin/comments?filter=approved"
            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm ${filter === "approved" ? "bg-green-500 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            تایید شده
          </Link>
        </div>
      </div>

      <ReviewsTable
        reviews={items.map((item) => ({
          ...item,
          createdAt: item.createdAt.toISOString(),
        }))}
      />

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1.5 overflow-x-auto sm:mt-6 sm:gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/admin/comments?${filter ? `filter=${filter}&` : ""}page=${p}`}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold sm:h-10 sm:w-10 sm:rounded-xl sm:text-sm ${p === page ? "bg-pink-500 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
            >
              {p.toLocaleString("fa-IR")}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}