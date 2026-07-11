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

  const [articlesData, categories, statistics] = await Promise.all([
    articleService.getFilteredArticles(filters),
    articleCategoryService.getAll(),
    articleService.getStatistics(),
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