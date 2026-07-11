import ArticleForm from "@/app/features/admin/components/articles/ArticleForm";

export default function CreateArticlePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          ایجاد مقاله جدید
        </h1>

        <p className="mt-2 text-gray-500">
          اطلاعات مقاله را وارد کرده و آن را منتشر یا به صورت پیش‌نویس ذخیره کنید.
        </p>
      </div>

      <ArticleForm mode="create" />
    </div>
  );
}