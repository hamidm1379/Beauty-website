import { auth } from "@/lib/auth";
import { cartService } from "@/lib/services/cart.service";
import { settingService } from "@/lib/services/setting.service";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const session = await auth();

  let cartCount = 0;

  if (session?.user?.id) {
    cartCount = await cartService.getCartCount(
      Number(session.user.id),
    );
  }

  const siteLogo = await settingService.getValue("siteLogo");

  return (
    <HeaderClient
      cartCount={cartCount}
      isLoggedIn={!!session?.user}
      role={session?.user?.role as string}
      siteLogo={siteLogo}
    />
  );
}