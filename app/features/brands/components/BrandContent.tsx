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

          prose-p:leading-9
          prose-p:text-gray-700

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
    </article>
  );
}