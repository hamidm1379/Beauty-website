"use client";

import { useEffect, useState } from "react";

import {
  FolderTree,
  Package,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

interface Category {
  id: number;
  title: string;
  createdAt: string;
  _count?: {
    products: number;
  };
}

export default function CategoryStatistics() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/categories");
    
        const json = await res.json();
    
        setCategories(json.data ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  const totalCategories = categories.length;

  const totalProducts = categories.reduce(
    (sum, category) => sum + (category._count?.products ?? 0),
    0
  );

  const latestCategory =
    categories.length > 0
      ? categories[categories.length - 1].title
      : "-";

  const cards = [
    {
      title: "کل دسته‌بندی‌ها",
      value: totalCategories,
      icon: FolderTree,
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "محصولات",
      value: totalProducts,
      icon: Package,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "دسته‌بندی فعال",
      value: totalCategories,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "آخرین دسته‌بندی",
      value: latestCategory,
      icon: TrendingUp,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="h-24 animate-pulse rounded-2xl bg-gray-100 sm:h-36 sm:rounded-3xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div key={card.title} className="rounded-2xl bg-white p-3 shadow-sm transition hover:shadow-md sm:rounded-3xl sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 sm:text-sm">{card.title}</p>

                <h3 className="mt-1.5 text-lg font-bold text-gray-900 sm:mt-3 sm:text-3xl">
                  {card.value}
                </h3>
              </div>

              <div className={`flex h-9 w-9 items-center justify-center rounded-xl sm:h-14 sm:w-14 sm:rounded-2xl ${card.color}`}>
                <Icon size={18} className="sm:hidden" />
                <Icon size={28} className="hidden sm:block" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}