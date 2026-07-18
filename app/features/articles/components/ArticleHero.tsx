import Image from "next/image";
import Link from "next/link";

import { CalendarDays, Eye, FolderOpen } from "lucide-react";

import { Article, ArticleCategory } from "@prisma/client";

type ArticleWithCategory = Article & {
  category: ArticleCategory;
};

interface Props {
  article: ArticleWithCategory;
}

export default function ArticleHero({
  article,
}: Props) {
  return (
    <section>
      {/* Breadcrumb */}

      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <Link
          href="/"
          className="transition hover:text-pink-500"
        >
          خانه
        </Link>

        <span>/</span>

        <Link
          href="/articles"
          className="transition hover:text-pink-500"
        >
          مقالات
        </Link>

        <span>/</span>

        <span className="text-gray-900">
          {article.category.title}
        </span>
      </nav>

      <div className="overflow-hidden rounded-4xl bg-white shadow-sm">
        {/* Image */}

        {article.thumbnail && (
          <div className="relative aspect-16/7 w-full">
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="p-8 md:p-10">
          {/* Category */}

          <span className="inline-flex rounded-full bg-pink-100 px-4 py-2 text-sm font-medium text-pink-600">
            {article.category.title}
          </span>

          {/* Title */}

          <h1 className="mt-5 text-3xl font-extrabold leading-relaxed text-gray-900 md:text-5xl">
            {article.title}
          </h1>

          {/* Excerpt */}

          {article.excerpt && (
            <p className="mt-6 max-w-4xl text-lg leading-9 text-gray-600">
              {article.excerpt}
            </p>
          )}

          {/* Meta */}

          <div className="mt-8 flex flex-wrap items-center gap-6 border-t pt-6 text-sm text-gray-500">

            <div className="flex items-center gap-2">
              <CalendarDays size={18} />

              <span>
                {article.publishedAt
                  ? new Date(
                      article.publishedAt
                    ).toLocaleDateString("fa-IR")
                  : "-"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Eye size={18} />

              <span>
                {article.views.toLocaleString()} بازدید
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FolderOpen size={18} />

              <span>{article.category.title}</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}