import { auth } from "@/lib/auth";
import AdminHeaderClient from "./AdminHeaderClient";

interface Props {
  onMenuClick?: () => void;
}

export default async function AdminHeader({ onMenuClick }: Props) {
  const session = await auth();

  return (
    <AdminHeaderClient
      username={session?.user?.username ?? session?.user?.name ?? ""}
      onMenuClick={onMenuClick}
    />
  );
}