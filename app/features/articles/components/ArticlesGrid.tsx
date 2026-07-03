"use client";

import { motion } from "framer-motion";
import ArticleCard, { Article } from "./ArticleCard";

const articles: Article[] = [
  {
    id: "1",
    slug: "how-to-care-skin",
    title: "۱۰ نکته طلایی برای داشتن پوستی شفاف و سالم",
    excerpt:
      "در این مقاله با مهم‌ترین اصول مراقبت از پوست، انتخاب محصولات مناسب و اشتباهات رایج آشنا می‌شوید.",
    image: "/arti.png",
    category: "مراقبت پوست",
    author: "محمد رضایی",
    date: "۲۳ تیر ۱۴۰۵",
    readTime: "۷ دقیقه",
  },
  {
    id: "2",
    slug: "best-serums",
    title: "بهترین سرم‌های ویتامین C برای انواع پوست",
    excerpt:
      "ویتامین C یکی از مهم‌ترین ترکیبات مراقبت پوست است که به روشن شدن و کاهش لک کمک می‌کند.",
    image: "/arti.png",
    category: "مراقبت پوست",
    author: "سارا محمدی",
    date: "۱۸ تیر ۱۴۰۵",
    readTime: "۵ دقیقه",
  },
  {
    id: "3",
    slug: "daily-makeup",
    title: "راهنمای آرایش روزانه طبیعی",
    excerpt:
      "اگر به دنبال آرایشی سبک و طبیعی برای استفاده روزمره هستید، این آموزش را از دست ندهید.",
    image: "/arti.png",
    category: "آرایش",
    author: "الهام کریمی",
    date: "۱۴ تیر ۱۴۰۵",
    readTime: "۶ دقیقه",
  },
  {
    id: "4",
    slug: "hair-care",
    title: "روش صحیح مراقبت از موهای رنگ شده",
    excerpt:
      "با رعایت چند نکته ساده می‌توانید ماندگاری رنگ مو را افزایش داده و از آسیب جلوگیری کنید.",
    image: "/arti.png",
    category: "مراقبت مو",
    author: "مریم احمدی",
    date: "۱۰ تیر ۱۴۰۵",
    readTime: "۸ دقیقه",
  },
  {
    id: "5",
    slug: "best-perfumes",
    title: "محبوب‌ترین عطرهای زنانه سال",
    excerpt:
      "در این مقاله بهترین عطرهای زنانه با ماندگاری بالا و رایحه‌های محبوب معرفی شده‌اند.",
    image: "/arti.png",
    category: "عطر",
    author: "محمد رضایی",
    date: "۵ تیر ۱۴۰۵",
    readTime: "۴ دقیقه",
  },
  {
    id: "6",
    slug: "cerave-review",
    title: "بررسی کامل محصولات CeraVe",
    excerpt:
      "آیا محصولات سراوی ارزش خرید دارند؟ نقاط قوت و ضعف این برند محبوب را بررسی کرده‌ایم.",
    image: "/arti.png",
    category: "برندها",
    author: "سارا محمدی",
    date: "۲ تیر ۱۴۰۵",
    readTime: "۹ دقیقه",
  },
];

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

export default function ArticlesGrid() {
  return (
    <section id="articles">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
        }}
        className="
          grid
          gap-8

          md:grid-cols-2

          xl:grid-cols-3
        "
      >
        {articles.map((article) => (
          <motion.div
            key={article.id}
            variants={item}
          >
            <ArticleCard article={article} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}