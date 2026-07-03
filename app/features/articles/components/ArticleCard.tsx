"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock3,
  User,
} from "lucide-react";

export interface Article {
  id: string;
  slug: string;

  title: string;

  excerpt: string;

  image: string;

  category: string;

  author: string;

  date: string;

  readTime: string;
}

type Props = {
  article: Article;
};

export default function ArticleCard({ article }: Props) {
  return (
    <motion.article
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        group

        overflow-hidden

        rounded-4xl

        border
        border-gray-100

        bg-white

        shadow-sm

        transition-all

        hover:shadow-2xl
      "
    >
      {/* Image */}

      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="
            object-cover

            transition-transform
            duration-700

            group-hover:scale-110
          "
        />

        {/* Overlay */}

        <div
          className="
            absolute
            inset-0

            bg-linear-to-t
            from-black/40
            via-transparent
            to-transparent
          "
        />

        {/* Category */}

        <span
          className="
            absolute

            right-5
            top-5

            rounded-full

            bg-white/90

            px-4
            py-2

            text-xs
            font-bold

            text-pink-600

            backdrop-blur
          "
        >
          {article.category}
        </span>
      </div>

      {/* Content */}

      <div className="p-6">
        {/* Meta */}

        <div
          className="
            flex

            flex-wrap

            items-center

            gap-4

            text-sm

            text-gray-500
          "
        >
          <div className="flex items-center gap-2">
            <User size={16} />
            {article.author}
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {article.date}
          </div>

          <div className="flex items-center gap-2">
            <Clock3 size={16} />
            {article.readTime}
          </div>
        </div>

        {/* Title */}

        <h2
          className="
            mt-5

            line-clamp-2

            text-2xl
            font-bold

            leading-9

            text-gray-900

            transition

            group-hover:text-pink-500
          "
        >
          {article.title}
        </h2>

        {/* Excerpt */}

        <p
          className="
            mt-4

            line-clamp-3

            leading-8

            text-gray-500
          "
        >
          {article.excerpt}
        </p>

        {/* Button */}

        <Link
          href={`/articles/${article.slug}`}
          className="
            mt-8

            inline-flex

            items-center

            gap-2

            font-bold

            text-pink-500

            transition

            hover:gap-4
          "
        >
          ادامه مطلب

          <ArrowLeft size={18} />
        </Link>
      </div>
    </motion.article>
  );
}