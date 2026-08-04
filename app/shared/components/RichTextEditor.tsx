"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  uploadFolder?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "شروع به نوشتن کنید...",
  minHeight = "300px",
  uploadFolder = "articles",
}: RichTextEditorProps) {
  return (
    <div className="rich-text-editor rounded-xl border border-gray-200 overflow-hidden">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(_event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
        config={{
          placeholder,
          extraPlugins: [createUploadAdapterPlugin(uploadFolder)],
          toolbar: {
            items: [
              "heading",
              "|",
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "|",
              "bulletedList",
              "numberedList",
              "|",
              "outdent",
              "indent",
              "|",
              "blockQuote",
              "insertTable",
              "|",
              "link",
              "uploadImage",
              "|",
              "undo",
              "redo",
            ],
            shouldNotGroupWhenFull: true,
          },
          heading: {
            options: [
              { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
              { model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
              { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
              { model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
              { model: "heading4", view: "h4", title: "Heading 4", class: "ck-heading_heading4" },
            ],
          },
          image: {
            toolbar: [
              "imageTextAlternative",
              "toggleImageCaption",
              "|",
              "imageStyle:inline",
              "imageStyle:block",
              "imageStyle:side",
            ],
          },
          table: {
            contentToolbar: [
              "tableColumn",
              "tableRow",
              "mergeTableCells",
            ],
          },
          language: "fa",
        }}
      />

      <style jsx global>{`
        .rich-text-editor .ck-editor__editable {
          min-height: ${minHeight};
          max-height: 600px;
          overflow-y: auto;
        }

        .rich-text-editor .ck-editor__top {
          border-bottom: 1px solid #e5e7eb;
        }

        .rich-text-editor .ck-toolbar {
          border: none !important;
          background: #f9fafb;
        }

        .rich-text-editor .ck-editor__main {
          background: white;
        }

        .rich-text-editor .ck-content {
          font-family: inherit;
          font-size: 14px;
          line-height: 1.8;
          padding: 16px;
        }

        .rich-text-editor .ck-content h1 {
          font-size: 1.6rem;
          font-weight: 700;
          margin: 1rem 0;
        }

        .rich-text-editor .ck-content h2 {
          font-size: 1.35rem;
          font-weight: 700;
          margin: 0.9rem 0;
        }

        .rich-text-editor .ck-content h3 {
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0.8rem 0;
        }

        .rich-text-editor .ck-content blockquote {
          border-left: 4px solid #ec4899;
          background: #fdf2f8;
          padding: 10px 14px;
          margin: 0.8rem 0;
          border-radius: 8px;
          font-style: italic;
        }

        .rich-text-editor .ck-content pre {
          background: #111827;
          color: white;
          border-radius: 10px;
          padding: 12px;
          overflow-x: auto;
          margin: 0.8rem 0;
        }

        .rich-text-editor .ck-content code {
          background: #f3f4f6;
          padding: 2px 6px;
          border-radius: 6px;
          font-size: 13px;
        }

        .rich-text-editor .ck-content pre code {
          background: transparent;
          color: inherit;
          padding: 0;
        }

        .rich-text-editor .ck-content img {
          display: block;
          max-width: 100%;
          border-radius: 12px;
          margin: 14px auto;
        }

        .rich-text-editor .ck-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.2rem 0;
        }

        .rich-text-editor .ck-content table td,
        .rich-text-editor .ck-content table th {
          border: 1px solid #d1d5db;
          padding: 8px;
        }

        .rich-text-editor .ck-content table th {
          background: #f3f4f6;
          font-weight: 700;
        }

        @media (min-width: 640px) {
          .rich-text-editor .ck-content {
            font-size: 16px;
            padding: 24px;
            line-height: 2;
          }

          .rich-text-editor .ck-content h1 {
            font-size: 2.2rem;
            margin: 1.5rem 0;
          }

          .rich-text-editor .ck-content h2 {
            font-size: 1.8rem;
            margin: 1.2rem 0;
          }

          .rich-text-editor .ck-content h3 {
            font-size: 1.5rem;
            margin: 1rem 0;
          }
        }
      `}</style>
    </div>
  );
}

function createUploadAdapterPlugin(folder: string) {
  return function CustomUploadAdapterPlugin(editor: ClassicEditor) {
    const fileRepository = editor.plugins.get("FileRepository" as any);

    fileRepository.createUploadAdapter = (loader: any) => {
      return {
        upload() {
          return loader.file.then((file: File) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", folder);

            return fetch("/api/upload", {
              method: "POST",
              body: formData,
            })
              .then((res) => res.json())
              .then((result) => {
                if (result.success) {
                  return { default: result.url };
                }
                throw new Error(result.message || "آپلود تصویر ناموفق بود.");
              });
          });
        },
        abort() {},
      };
    };
  };
}
