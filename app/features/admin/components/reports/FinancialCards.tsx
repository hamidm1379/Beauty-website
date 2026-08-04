import type { FinancialReport } from "./types";

export default function FinancialCards({ data }: { data: FinancialReport }) {
  const cards = [
    {
      title: "فروش ناخالص",
      value: data.grossSales,
    },
    {
      title: "تخفیف‌ها",
      value: data.discount,
    },
    {
      title: "فروش خالص",
      value: data.netSales,
    },
    {
      title: "سود",
      value: data.profit,
    },
    {
      title: "میانگین سفارش",
      value: data.averageOrderValue,
    },
  ];

  return (
    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 shadow"
        >
          <p className="text-sm sm:text-base text-gray-500">{card.title}</p>

          <h3 className="mt-2 sm:mt-3 text-lg sm:text-xl font-black text-pink-600 break-words">
            {card.value.toLocaleString()}
          </h3>

          <span className="text-xs sm:text-sm text-gray-500">تومان</span>
        </div>
      ))}
    </div>
  );
}