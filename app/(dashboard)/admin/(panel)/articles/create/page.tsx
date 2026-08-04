import ArticleForm from "@/app/features/admin/components/articles/ArticleForm";

export default function CreateArticlePage() {
  return (
    <div className="space-y-4 sm:space-y-8">
      <div>
        <h1 className="text-xl font-bold sm:text-3xl">ایجاد مقاله جدید</h1>

        <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-base">
          اطلاعات مقاله را وارد کرده و آن را منتشر یا به صورت پیش‌نویس ذخیره کنید.
        </p>
      </div>

      <ArticleForm mode="create" />
    </div>
  );
}