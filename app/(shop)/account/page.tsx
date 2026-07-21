import { getAccountProfile } from "@/app/features/account/actions";
import AccountClient from "@/app/features/account/components/AccountClient";

export default async function AccountPage() {
  const user = await getAccountProfile();

  return <AccountClient user={user} />;
}
