import { Article } from "@prisma/client";

interface Props {
  article: Article;
}

export default function ArticleContent({
  article,
}: Props) {
  return (
    <article
      className="
        rounded-4xl
        bg-white
        p-8
        md:p-12
        shadow-sm
      "
    >
      <div
        className="
          prose
          prose-lg
          max-w-none

          prose-headings:font-bold
          prose-headings:text-gray-900

          prose-h2:mt-14
          prose-h2:mb-6
          prose-h2:text-3xl

          prose-h3:mt-10
          prose-h3:text-2xl

          prose-p:text-gray-700
          prose-p:leading-9

          prose-a:text-pink-600
          prose-a:no-underline
          hover:prose-a:text-pink-700

          prose-img:rounded-3xl
          prose-img:shadow-md

          prose-ul:leading-9
          prose-ol:leading-9

          prose-blockquote:border-pink-500
          prose-blockquote:text-gray-600

          prose-strong:text-gray-900

          prose-code:text-pink-600

          prose-pre:rounded-2xl
        "
        dangerouslySetInnerHTML={{
          __html: article.content,
        }}
      />
    </article>
  );
}