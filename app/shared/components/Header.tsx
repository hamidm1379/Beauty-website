import { auth } from "@/lib/auth";
import { cartService } from "@/lib/services/cart.service";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const session = await auth();

  let cartCount = 0;

  if (session?.user?.id) {
    cartCount = await cartService.getCartCount(
      Number(session.user.id),
    );
  }

  return (
    <HeaderClient
      cartCount={cartCount}
      isLoggedIn={!!session?.user}
    />
  );
}