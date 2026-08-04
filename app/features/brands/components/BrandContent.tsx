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
      rounded-3xl
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
        px-8
        py-6
        "
      >
        <h2
          className="
          text-2xl
          font-black
          text-gray-900
          "
        >
          معرفی برند
        </h2>
      </div>

      {/* Content */}

      <div className="px-8 py-10">
        <div
          className="
          prose
          prose-lg
          prose-gray

          max-w-none

          prose-headings:font-black
          prose-headings:text-gray-900

          prose-h2:mb-6
          prose-h2:mt-14

          prose-h3:mb-4
          prose-h3:mt-10

          prose-p:leading-8
          prose-p:text-gray-700
          prose-p:text-justify

          prose-a:text-pink-500
          prose-a:no-underline
          hover:prose-a:text-pink-600

          prose-strong:text-gray-900

          prose-li:leading-8

          prose-blockquote:border-pink-500
          prose-blockquote:bg-pink-50
          prose-blockquote:p-4
          prose-blockquote:rounded-2xl

          prose-img:rounded-3xl
          prose-img:shadow-lg

          prose-table:w-full
          prose-table:overflow-hidden
          prose-table:rounded-2xl

          prose-th:bg-gray-100
          prose-th:p-4

          prose-td:p-4

          prose-code:text-pink-600
          prose-code:before:hidden
          prose-code:after:hidden

          prose-pre:rounded-3xl
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
              margin: 2rem auto;
              max-width: 100%;
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
              font-size: 0.875rem;
              line-height: 1.7;
              color: #6b7280;
              font-style: italic;
              padding: 0 1rem;
            }
          `,
        }}
      />
    </article>
  );
}