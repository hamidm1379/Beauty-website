import { cartRepository } from "@/lib/repositories/cart.repository";
import { productRepository } from "@/lib/repositories/product.repository";

class CartService {
  async addProduct(userId: number, productId: number) {
    const cart = await cartRepository.getOrCreateCart(userId);

    const existingItem = await cartRepository.findItem(cart.id, productId);

    if (existingItem) {
      return cartRepository.increaseQuantity(existingItem.id, userId);
    }

    const product = await productRepository.findById(productId);

    if (!product) {
      throw new Error("محصول یافت نشد.");
    }

    return cartRepository.createItem(cart.id, product.id, product.price);
  }
  async getCartCount(userId: number) {
    return cartRepository.getCartCount(userId);
  }
  async addToCart(
    userId: number,
    productId: number,
    quantity: number = 1,
    variantId?: number | null,
  ) {
    const product = await productRepository.findById(productId);

    if (!product) {
      throw new Error("محصول پیدا نشد.");
    }

    if (product.status !== "ACTIVE") {
      throw new Error("این محصول قابل سفارش نیست.");
    }

    if (product.stock <= 0) {
      throw new Error("موجودی محصول کافی نیست.");
    }

    const cart = await cartRepository.getOrCreateCart(userId);

    const item = await cartRepository.findItem(cart.id, product.id, variantId);

    const alreadyInCart = !!item;

    if (item) {
      await cartRepository.increaseQuantity(item.id, userId, quantity);
    } else {
      await cartRepository.createItem(
        cart.id,
        product.id,
        product.price,
        quantity,
        variantId,
      );
    }

    const cartData = await cartRepository.getCart(userId);

    return { ...cartData, alreadyInCart };
  }

  async getCart(userId: number) {
    return cartRepository.getCart(userId);
  }
  async increaseQuantity(cartItemId: number, userId: number) {
    return cartRepository.increaseQuantity(cartItemId, userId);
  }

  async decreaseQuantity(cartItemId: number, userId: number) {
    return cartRepository.decreaseQuantity(cartItemId, userId);
  }

  async removeItem(cartItemId: number, userId: number) {
    return cartRepository.removeItem(cartItemId, userId);
  }

  async clearCart(userId: number) {
    return cartRepository.clearCart(userId);
  }

  /**
   * بازگرداندن آیتم‌های یک سفارش به سبد خرید کاربر.
   * فقط آیتم‌هایی که محصولشان هنوز وجود دارد بازگردانده می‌شوند.
   * در صورت وجود قبلی، تعداد افزایش می‌یابد.
   */
  async restoreCartFromOrder(
    userId: number,
    order: {
      items: {
        productId: number | null;
        quantity: number;
        unitPrice: number;
        variantId: number | null;
      }[];
    },
  ) {
    const cart = await cartRepository.getOrCreateCart(userId);

    for (const item of order.items) {
      // اگر محصول حذف شده باشد، قابل بازگردانی نیست
      if (!item.productId) continue;

      const existing = await cartRepository.findItem(
        cart.id,
        item.productId,
        item.variantId,
      );

      if (existing) {
        await cartRepository.increaseQuantity(
          existing.id,
          userId,
          item.quantity,
        );
      } else {
        await cartRepository.createItem(
          cart.id,
          item.productId,
          item.unitPrice,
          item.quantity,
          item.variantId,
        );
      }
    }
  }
}

export const cartService = new CartService();
