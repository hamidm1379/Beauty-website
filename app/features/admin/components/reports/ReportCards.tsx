import type { ReportSummary } from "./types";

export default function ReportCards({ data }: { data: ReportSummary }) {
  const cards = [
    {
      title: "فروش کل",
      value: data.sales.toLocaleString() + " تومان",
    },
    {
      title: "تعداد سفارش",
      value: data.orders,
    },
    {
      title: "کاربران",
      value: data.users,
    },
    {
      title: "محصولات فروخته شده",
      value: data.soldItems,
    },
  ];

  return (
    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 shadow"
        >
          <p className="text-sm sm:text-base text-gray-500">{card.title}</p>

          <h2 className="mt-2 sm:mt-3 text-xl sm:text-2xl font-black text-pink-600 break-words">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}