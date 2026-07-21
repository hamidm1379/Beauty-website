import { ShoppingBag, Heart, Star, MapPin } from "lucide-react";

interface Props {
  stats: {
    orders: number;
    wishlist: number;
    reviews: number;
    addresses: number;
  };
}

export default function AdminUserStats({ stats }: Props) {
  const items = [
    {
      label: "سفارش‌ها",
      value: stats.orders,
      icon: ShoppingBag,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "علاقه‌مندی‌ها",
      value: stats.wishlist,
      icon: Heart,
      color: "bg-pink-100 text-pink-600",
    },
    {
      label: "نظرات",
      value: stats.reviews,
      icon: Star,
      color: "bg-amber-100 text-amber-600",
    },
    {
      label: "آدرس‌ها",
      value: stats.addresses,
      icon: MapPin,
      color: "bg-emerald-100 text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm"
        >
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}
          >
            <item.icon size={18} />
          </div>

          <p className="mt-3 text-2xl font-black text-gray-900">
            {item.value.toLocaleString("fa-IR")}
          </p>

          <p className="mt-1 text-sm text-gray-500">{item.label}</p>
        </div>
      ))}
    </div>
  );
}