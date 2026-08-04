"use client";

import { motion } from "framer-motion";

import ArticleCard from "./ArticleCard";


interface Props {
  articles: { id: number; title: string; slug: string; thumbnail?: string | null; excerpt?: string | null; category?: { title: string } | null; createdAt: string | Date }[];
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
    },
  },
};

export default function ArticlesGridClient({
  articles,
}: Props) {
  return (
    <section id="articles">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="
          grid
          gap-8
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
        "
      >
        {articles.map((article) => (
          <motion.div
            key={article.id}
            variants={item}
          >
            <ArticleCard
              article={{
                id: article.id.toString(),

                slug: article.slug,

                title: article.title,

                excerpt: article.excerpt,

                image: article.thumbnail,

                category: article.category.title,
                

                date: new Intl.DateTimeFormat("fa-IR").format(
                  new Date(article.publishedAt)
                ),

                readTime: `5 دقیقه`,
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}