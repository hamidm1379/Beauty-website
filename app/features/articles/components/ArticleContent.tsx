import { Article } from "@prisma/client";

interface Props {
  article: Article;
}

export default function ArticleContent({ article }: Props) {
  return (
    <article
      className="
        rounded-2xl
        sm:rounded-4xl
        bg-white
        p-4
        sm:p-8
        md:p-12
        shadow-sm
      "
    >
      <div
        className="
          prose
          max-w-none

          prose-headings:font-bold
          prose-headings:text-gray-900

          prose-h2:mt-6
          prose-h2:mb-4
          prose-h2:text-2xl
          sm:prose-h2:mt-10
          sm:prose-h2:mb-6
          sm:prose-h2:text-3xl

          prose-h3:mt-5
          prose-h3:text-xl
          sm:prose-h3:mt-8
          sm:prose-h3:text-2xl

          prose-p:text-gray-700
          prose-p:leading-7
          sm:prose-p:leading-8
          prose-p:text-justify

          prose-a:text-pink-600
          prose-a:no-underline
          hover:prose-a:text-pink-700

          prose-img:rounded-3xl
          prose-img:shadow-md

          prose-ul:leading-7
          sm:prose-ul:leading-9
          prose-ol:leading-7
          sm:prose-ol:leading-9

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

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .prose figure {
              margin: 1.5rem auto;
              max-width: 100%;
            }
            @media (min-width: 640px) {
              .prose figure {
                margin: 2rem auto;
              }
            }
            .prose figure img {
              display: block;
              max-width: 100%;
              border-radius: 1rem;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
              margin: 0 auto;
            }
            .prose figure figcaption {
              margin-top: 0.75rem;
              text-align: center;
              font-size: 0.8rem;
              line-height: 1.6;
              color: #6b7280;
              font-style: italic;
              padding: 0 0.5rem;
            }
            @media (min-width: 640px) {
              .prose figure figcaption {
                font-size: 0.875rem;
                line-height: 1.7;
                padding: 0 1rem;
              }
            }
          `,
        }}
      />
    </article>
  );
}
