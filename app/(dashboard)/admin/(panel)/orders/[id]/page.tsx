import { notFound } from "next/navigation";

import { orderService } from "@/lib/services/order.service";
import { settingService } from "@/lib/services/setting.service";

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

  const [siteLogo, siteName] = await Promise.all([
    settingService.getValue("siteLogo"),
    settingService.getValue("siteName"),
  ]);
  

  return (
    <OrderDetails
      order={order}
      siteLogo={siteLogo}
      siteName={siteName ?? "Erikeh"}
    />
  );
}
