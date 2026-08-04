import { notFound } from "next/navigation";

import { orderService } from "@/lib/services/order.service";

import OrderDetails from "@/app/features/admin/components/orders/OrderDetails";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  let order;

  try {
    order = await orderService.getAdminOrder(Number(id));
  } catch {
    notFound();
  }

  return <OrderDetails order={order} />;
}
