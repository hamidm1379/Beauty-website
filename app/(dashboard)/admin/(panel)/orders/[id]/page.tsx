import { orderService } from "@/lib/services/order.service";

import OrderDetails from "@/app/features/admin/components/orders/OrderDetails";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const order = await orderService.getAdminOrder(Number(id));

  return <OrderDetails order={order} />;
}
