import { auth } from "@/lib/auth";
import AdminHeaderClient from "./AdminHeaderClient";

export default async function AdminHeader() {
  const session = await auth();

  return (
    <AdminHeaderClient
      username={session?.user?.username ?? session?.user?.name ?? ""}
    />
  );
}