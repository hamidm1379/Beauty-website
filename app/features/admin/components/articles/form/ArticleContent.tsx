"use client";

import { useEffect } from "react";

import { EditorContent, useEditor } from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";

import StarterKit from "@tiptap/starter-kit";

import { Placeholder } from "@tiptap/extensions";
import { TextStyleKit } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import TextAlign from "@tiptap/extension-text-align";

import { TaskList, TaskItem } from "@tiptap/extension-list";
import { Table, TableRow, TableCell, TableHeader } from "@tiptap/extension-table";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

import { createLowlight } from "lowlight";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Code2,
  Highlighter,
  MonitorPlay,
} from "lucide-react";

const lowlight = createLowlight();

interface ArticleContentProps {
  form: {
    content: string;
  };
  updateField: (name: string, value: any) => void;
}

export default function ArticleContent({
  form,
  updateField,
}: ArticleContentProps) {
  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      // StarterKit already includes Link, ListKeymap, and Underline in v3
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        link: {
          openOnClick: false,
        },
      }),
      Placeholder.configure({
        placeholder: "شروع به نوشتن مقاله کنید...",
      }),
      Highlight,
      TextStyleKit.configure({
        color: {
          types: ["textStyle"],
        },
      }),
      Image.configure({
        inline: false,
      }),
      Youtube.configure({
        controls: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],

    content: form.content,

    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none min-h-[450px] focus:outline-none p-6",
      },
    },

    onUpdate({ editor }) {
      updateField("content", editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (editor.getHTML() !== form.content) {
      editor.commands.setContent(form.content || "");
    }
  }, [editor, form.content]);

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-xl font-bold">محتوای مقاله</h2>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b bg-gray-50 p-4">
        {/* Headings */}
        <select
          onChange={(e) => {
            const level = Number(e.target.value);

            if (level === 0) {
              editor.chain().focus().setParagraph().run();
            } else {
              editor
                .chain()
                .focus()
                .toggleHeading({
                  level: level as 1 | 2 | 3 | 4 | 5 | 6,
                })
                .run();
            }
          }}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value={0}>Paragraph</option>
          <option value={1}>H1</option>
          <option value={2}>H2</option>
          <option value={3}>H3</option>
          <option value={4}>H4</option>
          <option value={5}>H5</option>
          <option value={6}>H6</option>
        </select>

        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded-lg border p-2 ${
            editor.isActive("bold") ? "bg-pink-600 text-white" : ""
          }`}
        >
          <Bold size={16} />
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded-lg border p-2 ${
            editor.isActive("italic") ? "bg-pink-600 text-white" : ""
          }`}
        >
          <Italic size={16} />
        </button>

        {/* Underline */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`rounded-lg border p-2 ${
            editor.isActive("underline") ? "bg-pink-600 text-white" : ""
          }`}
        >
          <UnderlineIcon size={16} />
        </button>

        {/* Strike */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`rounded-lg border p-2 ${
            editor.isActive("strike") ? "bg-pink-600 text-white" : ""
          }`}
        >
          <Strikethrough size={16} />
        </button>

        {/* Highlight */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`rounded-lg border p-2 ${
            editor.isActive("highlight") ? "bg-yellow-400 text-black" : ""
          }`}
        >
          <Highlighter size={16} />
        </button>

        {/* Bullet */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded-lg border p-2 ${
            editor.isActive("bulletList") ? "bg-pink-600 text-white" : ""
          }`}
        >
          <List size={16} />
        </button>

        {/* Ordered */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded-lg border p-2 ${
            editor.isActive("orderedList") ? "bg-pink-600 text-white" : ""
          }`}
        >
          <ListOrdered size={16} />
        </button>

        {/* Quote */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`rounded-lg border p-2 ${
            editor.isActive("blockquote") ? "bg-pink-600 text-white" : ""
          }`}
        >
          <Quote size={16} />
        </button>

        {/* Code */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`rounded-lg border p-2 ${
            editor.isActive("codeBlock") ? "bg-pink-600 text-white" : ""
          }`}
        >
          <Code2 size={16} />
        </button>

        {/* Text Align */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className="rounded-lg border px-3 py-2"
        >
          L
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className="rounded-lg border px-3 py-2"
        >
          C
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className="rounded-lg border px-3 py-2"
        >
          R
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className="rounded-lg border px-3 py-2"
        >
          J
        </button>

        {/* Color */}
        <input
          type="color"
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
        />

        {/* Undo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="rounded-lg border p-2"
        >
          <Undo2 size={16} />
        </button>

        {/* Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="rounded-lg border p-2"
        >
          <Redo2 size={16} />
        </button>

        {/* Link */}
        <button
          type="button"
          onClick={() => {
            const previous = editor.getAttributes("link").href;
            const url = prompt("لینک را وارد کنید", previous);

            if (url === null) return;

            if (url === "") {
              editor.chain().focus().unsetLink().run();
              return;
            }

            editor.chain().focus().setLink({ href: url }).run();
          }}
          className="rounded-lg border p-2"
        >
          <LinkIcon size={16} />
        </button>

        {/* Image */}
        <button
          type="button"
          onClick={async () => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";

            input.onchange = async () => {
              if (!input.files?.length) return;

              const file = input.files[0];
              const formData = new FormData();

              formData.append("file", file);
              formData.append("folder", "articles");

              const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
              });

              const json = await res.json();

              if (!json.success) return;

              editor.chain().focus().setImage({ src: json.url }).run();
            };

            input.click();
          }}
          className="rounded-lg border p-2"
        >
          <ImageIcon size={16} />
        </button>

        {/* Table */}
        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          className="rounded-lg border p-2"
        >
          <TableIcon size={16} />
        </button>

        {/* Youtube */}
        <button
          type="button"
          onClick={() => {
            const url = prompt("Youtube URL");

            if (!url) return;

            editor.chain().focus().setYoutubeVideo({ src: url }).run();
          }}
          className="rounded-lg border p-2"
        >
          <MonitorPlay size={16} />
        </button>
      </div>

      {/* Bubble Menu */}
      <BubbleMenu editor={editor} options={{ offset: 6, placement: "top" }}>
        <div className="flex gap-2 rounded-xl border bg-white p-2 shadow-xl">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`rounded-lg p-2 ${
              editor.isActive("bold") ? "bg-pink-600 text-white" : ""
            }`}
          >
            <Bold size={16} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`rounded-lg p-2 ${
              editor.isActive("italic") ? "bg-pink-600 text-white" : ""
            }`}
          >
            <Italic size={16} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`rounded-lg p-2 ${
              editor.isActive("underline") ? "bg-pink-600 text-white" : ""
            }`}
          >
            <UnderlineIcon size={16} />
          </button>

          <button
            type="button"
            onClick={() => {
              const url = prompt("آدرس لینک");

              if (!url) return;

              editor.chain().focus().setLink({ href: url }).run();
            }}
            className="rounded-lg p-2"
          >
            <LinkIcon size={16} />
          </button>
        </div>
      </BubbleMenu>

      {/* Floating Menu */}
      <FloatingMenu
        editor={editor}
        options={{ offset: 6, placement: "bottom-start" }}
      >
        <div className="flex gap-2 rounded-xl border bg-white p-2 shadow-xl">
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className="rounded-lg border px-3 py-2"
          >
            H2
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="rounded-lg border px-3 py-2"
          >
            <List size={16} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className="rounded-lg border px-3 py-2"
          >
            <ListOrdered size={16} />
          </button>
        </div>
      </FloatingMenu>

      {/* Editor */}
      <div className="min-h-125 bg-white">
        <EditorContent editor={editor} />
      </div>

      {/* Styles */}
      <style jsx global>{`
        .ProseMirror {
          min-height: 500px;
          padding: 24px;
          outline: none;
          line-height: 2;
          font-size: 16px;
        }

        .ProseMirror h1 {
          font-size: 2.2rem;
          font-weight: 700;
          margin: 1.5rem 0;
        }

        .ProseMirror h2 {
          font-size: 1.8rem;
          font-weight: 700;
          margin: 1.2rem 0;
        }

        .ProseMirror h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 1rem 0;
        }

        .ProseMirror p {
          margin: 12px 0;
        }

        .ProseMirror ul {
          list-style: disc;
          padding-left: 2rem;
          margin: 1rem 0;
        }

        .ProseMirror ol {
          list-style: decimal;
          padding-left: 2rem;
          margin: 1rem 0;
        }

        .ProseMirror blockquote {
          border-left: 4px solid #ec4899;
          background: #fdf2f8;
          padding: 12px 18px;
          margin: 1rem 0;
          border-radius: 8px;
          font-style: italic;
        }

        .ProseMirror pre {
          background: #111827;
          color: white;
          border-radius: 12px;
          padding: 16px;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .ProseMirror code {
          background: #f3f4f6;
          padding: 2px 6px;
          border-radius: 6px;
          font-size: 14px;
        }

        .ProseMirror pre code {
          background: transparent;
          color: inherit;
          padding: 0;
        }

        .ProseMirror table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }

        .ProseMirror table td,
        .ProseMirror table th {
          border: 1px solid #d1d5db;
          padding: 10px;
        }

        .ProseMirror table th {
          background: #f3f4f6;
          font-weight: 700;
        }

        .ProseMirror img {
          display: block;
          max-width: 100%;
          border-radius: 14px;
          margin: 20px auto;
        }

        .ProseMirror iframe {
          width: 100%;
          min-height: 420px;
          border-radius: 16px;
          margin: 20px 0;
        }

        .ProseMirror hr {
          margin: 2rem 0;
          border: none;
          border-top: 1px solid #d1d5db;
        }

        .ProseMirror a {
          color: #2563eb;
          text-decoration: underline;
        }

        .ProseMirror .is-empty::before {
          color: #9ca3af;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }

        .ProseMirror .task-list {
          list-style: none;
          padding-left: 0;
        }

        .ProseMirror .task-list-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ProseMirror .task-list-item input {
          width: 18px;
          height: 18px;
        }

        .ProseMirror:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
}