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

export default function ArticleHero({ article }: Props) {
  return (
    <section>
     

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm sm:rounded-4xl">
        {/* Image */}
        {article.thumbnail && (
          <div className="relative aspect-video w-full lg:aspect-16/7">
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

        <div className="p-4 sm:p-6 md:p-8 lg:p-10">
          {/* Category */}
          <span className="inline-flex rounded-full bg-pink-100 px-3 py-1.5 text-xs font-medium text-pink-600 sm:px-4 sm:py-2 sm:text-sm">
            {article.category.title}
          </span>

          {/* Title */}
          <h1 className="mt-3 text-2xl font-extrabold leading-relaxed text-gray-900 sm:mt-4 sm:text-3xl md:text-4xl lg:mt-5 lg:text-5xl">
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="mt-3 max-w-4xl text-sm leading-7 text-gray-600 sm:mt-4 sm:text-lg sm:leading-9 md:mt-6 ">
              {article.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="mt-4 flex flex-wrap items-center gap-3 border-t pt-4 text-xs text-gray-500 sm:mt-6 sm:gap-4 sm:pt-5 sm:text-sm md:mt-8 md:gap-6 md:pt-6">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <CalendarDays size={16} className="sm:size-4.5" />
              <span>
                {article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString("fa-IR")
                  : "-"}
              </span>
            </div>

            {/* <div className="flex items-center gap-1.5 sm:gap-2">
              <Eye size={16} className="sm:size-4.5" />
              <span>{article.views.toLocaleString()} بازدید</span>
            </div> */}

            <div className="flex items-center gap-1.5 sm:gap-2">
              <FolderOpen size={16} className="sm:size-4.5" />
              <span>{article.category.title}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}