import ArticlesGridClient from "@/app/features/articles/components/ArticlesGridClient";

import type { Article, ArticleCategory } from "@prisma/client";

type ArticleWithCategory = Article & {
  category: ArticleCategory;
};

interface Props {
  articles: ArticleWithCategory[];
}

export default function ArticlesGrid({
  articles,
}: Props) {
  return <ArticlesGridClient articles={articles} />;
}