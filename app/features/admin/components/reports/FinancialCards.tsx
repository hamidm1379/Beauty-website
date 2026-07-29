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
    <div
      className="
grid
gap-6
md:grid-cols-3
xl:grid-cols-5
"
    >
      {cards.map((card) => (
        <div
          key={card.title}
          className="
rounded-3xl
bg-white
p-6
shadow
"
        >
          <p
            className="
text-gray-500
"
          >
            {card.title}
          </p>

          <h3
            className="
mt-3
text-xl
font-black
text-pink-600
"
          >
            {card.value.toLocaleString()}
          </h3>

          <span>تومان</span>
        </div>
      ))}
    </div>
  );
}
