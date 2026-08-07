import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function AdminNotFound() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <FileQuestion className="h-8 w-8 text-gray-400" />
        </div>

        <h2 className="text-lg font-bold text-gray-900">
          صفحه پیدا نشد
        </h2>

        <p className="max-w-md text-sm text-gray-500">
          صفحه مورد نظر شما وجود ندارد یا حذف شده است.
        </p>

        <Link
          href="/admin"
          className="mt-2 rounded-xl bg-pink-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-pink-600"
        >
          بازگشت به داشبورد
        </Link>
      </div>
    </div>
  );
}
