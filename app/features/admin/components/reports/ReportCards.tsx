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
    <div
      className="
grid
gap-6
md:grid-cols-4
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

          <h2
            className="
mt-3
text-2xl
font-black
text-pink-600
"
          >
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}
