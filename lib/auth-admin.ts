import { auth } from "@/lib/auth";

export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (!session.user.isActive) {
    throw new Error("Account is disabled");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  return session;
}