"use client";

import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";

interface Props {
  article: {
    title: string;
    category: {
      title: string;
      slug: string;
    };
  };
}

export default function Breadcrumb({ article }: Props) {
  const items = [
    {
      title: "خانه",
      href: "/",
    },
    {
      title: "مقالات",
      href: "/articles",
    },
    {
      title: article.category.title,
      href: `/articles?category=${article.category.slug}`,
    },
    {
      title: article.title,
    },
  ];

  return (
    <nav
      className="
        flex
        flex-wrap
        items-center
        gap-2

        rounded-2xl
        border
        border-gray-100

        bg-white

        px-5
        py-4

        text-sm

        shadow-sm
      "
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={index}
            className="
              flex
              items-center
              gap-2
            "
          >
            {index !== 0 && (
              <ChevronLeft
                className="
                  h-4
                  w-4
                  text-gray-300
                "
              />
            )}

            {isLast ? (
              <span
                className="
                  font-semibold
                  text-gray-900
                "
              >
                {item.title}
              </span>
            ) : (
              <Link
                href={item.href!}
                className="
                  flex
                  items-center
                  gap-2

                  text-gray-500

                  transition-colors

                  hover:text-pink-500
                "
              >
                {index === 0 && (
                  <Home
                    className="
                      h-4
                      w-4
                    "
                  />
                )}

                {item.title}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
