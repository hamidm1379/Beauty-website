"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock3 } from "lucide-react";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
}

type Props = {
  article: Article;
};

export default function ArticleCard({ article }: Props) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="
        group
        flex h-full flex-col
        overflow-hidden
        rounded-3xl
        border border-gray-100
        bg-white
        shadow-sm
        transition-all hover:shadow-xl
      "
    >
      {/* Image */}
      <div className="relative aspect-4/3 shrink-0 overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="
            object-cover
            transition-transform duration-700
            group-hover:scale-105
          "
        />

        <div
          className="
            absolute inset-0
            bg-linear-to-t from-black/40 via-transparent to-transparent
          "
        />

        <span
          className="
            absolute right-4 top-4
            rounded-full
            bg-white/90 px-3 py-1.5
            text-[10px] font-bold uppercase tracking-wide
            text-pink-600 backdrop-blur
          "
        >
          {article.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-gray-500 sm:gap-3 sm:text-xs">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            تاریخ انتشار :{article.date}
          </div>
          {/* <div className="flex items-center gap-1.5">
            <Clock3 size={14} />
            {article.readTime}
          </div> */}
        </div>

        {/* Title */}
        <Link href={`/articles/${article.slug}`}>
          <h2
            className="
              mt-3 line-clamp-2
              text-lg font-bold leading-6
              text-gray-900
              transition group-hover:text-pink-500
              sm:text-xl sm:leading-7
            "
          >
            {article.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p
          className="
            mt-2 line-clamp-3
            text-sm leading-6
            text-gray-500
            sm:text-base sm:leading-7
            text-justify
          "
        >
          {article.excerpt}
        </p>

        {/* Button */}

        <Link
          href={`/articles/${article.slug}`}
          className="
    mt-4 inline-flex items-center gap-1.5 self-end
    text-xs font-bold text-pink-500
    transition hover:gap-3
    sm:mt-6 sm:text-sm
  "
        >
          ادامه مطلب
          <ArrowLeft size={16} />
        </Link>
      </div>
    </motion.article>
  );
}
