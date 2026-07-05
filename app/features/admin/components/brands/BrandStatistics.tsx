"use client";

import { useEffect, useState } from "react";

import {
  BadgeCheck,
  Package,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

interface Brand {
  id: number;
  title: string;
  createdAt: string;
  _count?: {
    products: number;
  };
}

export default function BrandStatistics() {
  const [brands, setBrands] = useState<Brand[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBrands();
  }, []);

  async function loadBrands() {
    try {
      const res = await fetch("/api/brands");

      const json = await res.json();

      setBrands(json.data ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const totalBrands = brands.length;

  const totalProducts = brands.reduce(
    (sum, brand) => sum + (brand._count?.products ?? 0),
    0
  );

  const latestBrand =
    brands.length > 0
      ? brands[brands.length - 1].title
      : "-";

  const cards = [
    {
      title: "کل برندها",
      value: totalBrands,
      icon: BadgeCheck,
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "محصولات",
      value: totalProducts,
      icon: Package,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "برند فعال",
      value: totalBrands,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "آخرین برند",
      value: latestBrand,
      icon: TrendingUp,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-36 animate-pulse rounded-3xl bg-gray-100"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h3 className="mt-3 text-3xl font-bold text-gray-900">
                  {card.value}
                </h3>

              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.color}`}
              >
                <Icon size={28} />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}