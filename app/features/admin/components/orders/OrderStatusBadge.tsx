import { OrderStatus } from "@prisma/client";

type StatusStyle = {
  title: string;
  class: string;
};

const statusMap: Record<OrderStatus, StatusStyle> = {
  PENDING: {
    title: "در انتظار",
    class: "bg-yellow-100 text-yellow-600",
  },

  CONFIRMED: {
    title: "تایید شده",
    class: "bg-blue-100 text-blue-600",
  },

  PROCESSING: {
    title: "در حال پردازش",
    class: "bg-purple-100 text-purple-600",
  },

  SHIPPED: {
    title: "ارسال شده",
    class: "bg-indigo-100 text-indigo-600",
  },

  IN_TRANSIT: {
    title: "در حال ارسال",
    class: "bg-cyan-100 text-cyan-600",
  },

  DELIVERED: {
    title: "تحویل شده",
    class: "bg-green-100 text-green-600",
  },

  CANCELLED: {
    title: "لغو شده",
    class: "bg-red-100 text-red-600",
  },

  RETURNED: {
    title: "مرجوعی",
    class: "bg-gray-100 text-gray-600",
  },
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const item = statusMap[status];

  return (
    <span
      className={`
rounded-full
px-2
py-1
text-[10px]
font-semibold
w-16.25
${item?.class}
`}
    >
      {item?.title ?? status}
    </span>
  );
}
