import ArticleHeader from "@/app/features/admin/components/articles/ArticleHeader";
import ArticleToolbar from "@/app/features/admin/components/articles/ArticleToolbar";
import ArticlesTable from "@/app/features/admin/components/articles/ArticlesTable";

import { articleService } from "@/lib/services/article.service";
import { articleCategoryService } from "@/lib/services/article-category.service";

interface ArticlesPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    status?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }>;
}

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const params = await searchParams;

  const filters = {
    search: params.search ?? "",
    category: params.category ?? "",
    status: params.status ?? "",
    sort: params.sort ?? "newest",
    page: Number(params.page ?? 1),
    limit: Number(params.limit ?? 10),
  };

  const [articlesData, categories, statistics, brandArticlesData] = await Promise.all([
    articleService.getFilteredArticles(filters),
    articleCategoryService.getAll(),
    articleService.getStatistics(),
    articleService.getFilteredArticles({
      category: "brands",
      status: "",
      sort: "newest",
      page: 1,
      limit: 50,
    }),
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <ArticleHeader
        totalArticles={statistics.totalArticles}
        publishedArticles={statistics.publishedArticles}
        draftArticles={statistics.draftArticles}
        totalViews={statistics.totalViews}
      />

      {/* Toolbar */}
      <ArticleToolbar
        categories={categories}
        filters={filters}
        totalArticles={statistics.totalArticles}
      />

      {/* Table */}
      <ArticlesTable
        articles={articlesData.items}
      />

      {/* Brand Articles */}
      {brandArticlesData.items.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900">مقالات برندها</h2>
            <span className="rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-pink-600">
              {brandArticlesData.total}
            </span>
          </div>
          <ArticlesTable
            articles={brandArticlesData.items}
          />
        </div>
      )}

      {/* Pagination */}
      {/* <ArticlePagination
        page={articlesData.page}
        totalPages={articlesData.totalPages}
        totalItems={articlesData.total}
        perPage={filters.limit}
      /> */}
    </div>
  );
}