"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  CalendarDays,
  Check,
  Copy,
  Eye,
  FolderOpen,
  Share2,
  Sparkles,
} from "lucide-react";

import { Article, ArticleCategory } from "@prisma/client";

import { siteConfig } from "@/lib/seo/metadata";

type ArticleWithCategory = Article & {
  category: ArticleCategory;
};

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.933zm-1.291 19.497h2.039L6.486 3.24H4.298l13.312 17.41z" />
    </svg>
  );
}

interface Props {
  article: ArticleWithCategory;
  suggestedArticles: ArticleWithCategory[];
}

export default function ArticleSidebar({ article, suggestedArticles }: Props) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${siteConfig.url}/articles/${article.slug}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(article.title);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      label: "تلگرام",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      icon: TelegramIcon,
      iconBg: "bg-sky-500",
      buttonClass:
        "border-sky-100 bg-sky-50/80 hover:border-sky-200 hover:bg-sky-50",
      textClass: "text-sky-700",
    },
    {
      label: "واتساپ",
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      icon: WhatsAppIcon,
      iconBg: "bg-green-500",
      buttonClass:
        "border-green-100 bg-green-50/80 hover:border-green-200 hover:bg-green-50",
      textClass: "text-green-700",
    },
    {
      label: "ایکس",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      icon: XIcon,
      iconBg: "bg-gray-900",
      buttonClass:
        "border-gray-200 bg-gray-50/80 hover:border-gray-300 hover:bg-gray-100",
      textClass: "text-gray-800",
    },
  ] as const;

  return (
    <aside className="space-y-4 md:space-y-6">
      {/* اطلاعات مقاله */}
      <div className="rounded-3xl bg-white p-4 shadow-sm md:p-6">
        <h3 className="mb-4 text-base font-bold md:mb-6 md:text-lg">
          اطلاعات مقاله
        </h3>

        <div className="space-y-3 md:space-y-5">
          <div className="flex items-center gap-2 md:gap-3">
            <CalendarDays size={16} className="text-pink-500 md:size-4.5" />
            <span className="text-xs text-gray-600 md:text-sm">
              {article.publishedAt
                ? new Date(article.publishedAt).toLocaleDateString("fa-IR")
                : "-"}
            </span>
          </div>
                {/*
          <div className="flex items-center gap-2 md:gap-3">
            <Eye size={16} className="text-pink-500 md:size-4.5" />
            <span className="text-xs text-gray-600 md:text-sm">
              {article.views.toLocaleString()} بازدید
            </span>
          </div> */}

          <div className="flex items-center gap-2 md:gap-3">
            <FolderOpen size={16} className="text-pink-500 md:size-4.5" />
            <span className="text-xs text-gray-600 md:text-sm">
              {article.category.title}
            </span>
          </div>
        </div>
      </div>

      {/* مقالات پیشنهادی */}
      {suggestedArticles.length > 0 && (
        <div className="rounded-3xl bg-white p-4 shadow-sm md:p-6">
          <div className="mb-4 flex items-center gap-2 md:mb-5">
            <Sparkles size={16} className="text-pink-500 md:size-4.5" />
            <h3 className="text-base font-bold md:text-lg">مقالات پیشنهادی</h3>
          </div>

          <ul className="space-y-3 md:space-y-4">
            {suggestedArticles.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/articles/${item.slug}`}
                  className="group flex gap-2 transition hover:opacity-90 md:gap-3"
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gray-100 md:h-14 md:w-14">
                    <Image
                      src={item.thumbnail ?? "/images/no-image.png"}
                      alt={item.title}
                      fill
                      sizes="56px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-xs font-medium text-gray-800 transition group-hover:text-pink-500 md:text-sm">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-[10px] text-gray-500 md:mt-1 md:text-xs">
                      {item.category.title}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* اشتراک گذاری */}
      <div className="rounded-3xl bg-white p-4 shadow-sm md:p-6">
        <div className="mb-3 flex items-center gap-2 md:mb-5">
          <Share2 size={16} className="text-pink-500 md:size-4.5" />
          <h3 className="text-base font-bold md:text-lg">اشتراک گذاری</h3>
        </div>

        <p className="mb-3 text-xs leading-6 text-gray-500 md:mb-4 md:text-sm md:leading-7">
          این مقاله را با دوستان خود به اشتراک بگذارید.
        </p>

        <div className="grid grid-cols-2 gap-2 md:gap-3">
          {shareOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Link
                key={option.label}
                target="_blank"
                rel="noopener noreferrer"
                href={option.href}
                className={`
                  group flex flex-col items-center gap-2 rounded-2xl border px-2 py-3 transition
                  md:gap-2.5 md:px-3 md:py-4
                  ${option.buttonClass}
                `}
              >
                <span
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm transition
                    group-hover:scale-105 md:h-11 md:w-11
                    ${option.iconBg}
                  `}
                >
                  <Icon className="h-4 w-4 md:h-5 md:w-5" />
                </span>
                <span
                  className={`text-[10px] font-semibold md:text-xs ${option.textClass}`}
                >
                  {option.label}
                </span>
              </Link>
            );
          })}

          <button
            type="button"
            onClick={handleCopyLink}
            className={`
              group flex flex-col items-center gap-2 rounded-2xl border px-2 py-3 transition
              md:gap-2.5 md:px-3 md:py-4
              ${
                copied
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-pink-100 bg-pink-50/80 hover:border-pink-200 hover:bg-pink-50"
              }
            `}
          >
            <span
              className={`
                flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm transition
                group-hover:scale-105 md:h-11 md:w-11
                ${copied ? "bg-emerald-500" : "bg-pink-500"}
              `}
            >
              {copied ? (
                <Check className="h-4 w-4 md:h-5 md:w-5" />
              ) : (
                <Copy className="h-4 w-4 md:h-5 md:w-5" />
              )}
            </span>
            <span
              className={`text-[10px] font-semibold md:text-xs ${
                copied ? "text-emerald-700" : "text-pink-700"
              }`}
            >
              {copied ? "کپی شد" : "کپی لینک"}
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}