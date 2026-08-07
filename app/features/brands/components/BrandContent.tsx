interface Props {
  content: string;
}

export default function BrandContent({
  content,
}: Props) {
  return (
    <article
      className="
      overflow-hidden
      rounded-2xl
      sm:rounded-3xl
      border
      border-gray-100
      bg-white
      shadow-sm
      "
    >
      {/* Header */}

      <div
        className="
        border-b
        border-gray-100
        px-4
        py-4
        sm:px-8
        sm:py-6
        "
      >
        <h2
          className="
          text-xl
          font-black
          text-gray-900
          sm:text-2xl
          "
        >
          معرفی برند
        </h2>
      </div>

      {/* Content */}

      <div className="px-4 py-6 sm:px-8 sm:py-10">
        <div
          className="
          prose
          max-w-none

          prose-headings:font-black
          prose-headings:text-gray-900

          prose-h2:mb-4
          prose-h2:mt-8
          prose-h2:text-xl
          sm:prose-h2:mb-6
          sm:prose-h2:mt-14
          sm:prose-h2:text-2xl

          prose-h3:mb-3
          prose-h3:mt-6
          prose-h3:text-lg
          sm:prose-h3:mb-4
          sm:prose-h3:mt-10
          sm:prose-h3:text-xl

          prose-p:leading-7
          prose-p:text-sm
          prose-p:text-gray-700
          prose-p:text-justify
          sm:prose-p:text-base
          sm:prose-p:leading-8

          prose-a:text-pink-500
          prose-a:no-underline
          hover:prose-a:text-pink-600

          prose-strong:text-gray-900

          prose-li:leading-7
          prose-li:text-sm
          sm:prose-li:text-base
          sm:prose-li:leading-8

          prose-blockquote:border-pink-500
          prose-blockquote:bg-pink-50
          prose-blockquote:p-3
          prose-blockquote:rounded-xl
          sm:prose-blockquote:p-4
          sm:prose-blockquote:rounded-2xl

          prose-img:rounded-2xl
          prose-img:shadow-lg
          sm:prose-img:rounded-3xl

          prose-table:w-full
          prose-table:overflow-hidden
          prose-table:rounded-xl
          sm:prose-table:rounded-2xl

          prose-th:bg-gray-100
          prose-th:p-3
          sm:prose-th:p-4

          prose-td:p-3
          sm:prose-td:p-4

          prose-code:text-pink-600
          prose-code:before:hidden
          prose-code:after:hidden

          prose-pre:rounded-2xl
          sm:prose-pre:rounded-3xl
          "
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>

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