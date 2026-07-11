import { notFound } from "next/navigation";

import ArticleForm from "@/app/features/admin/components/articles/ArticleForm";
import { articleService } from "@/lib/services/article.service";

interface EditArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  const { id } = await params;

  let article = null;

  try {
    article = await articleService.getById(Number(id));
  } catch {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          ویرایش مقاله
        </h1>

        <p className="mt-2 text-gray-500">
          اطلاعات مقاله را ویرایش کنید.
        </p>
      </div>

      <ArticleForm
        mode="edit"
        initialData={article}
      />
    </div>
  );
}