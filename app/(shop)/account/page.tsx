import { getAccountProfile } from "@/app/features/account/actions";
import AccountClient from "@/app/features/account/components/AccountClient";
import { prisma } from "@/lib/prisma";

type Props = {
  searchParams: Promise<{ payment?: string; order?: string }>;
};

export default async function AccountPage({ searchParams }: Props) {
  const user = await getAccountProfile();

  const { payment, order } = await searchParams;

  let orderNumber: string | null = null;

  if (order) {
    const found = await prisma.order.findUnique({
      where: { id: Number(order) },
      select: { orderNumber: true },
    });

    orderNumber = found?.orderNumber ?? null;
  }

  return (
    <AccountClient
      user={user}
      paymentStatus={payment ?? null}
      orderNumber={orderNumber}
    />
  );
}
