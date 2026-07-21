import { orderRepository } from "@/lib/repositories/order.repository";
import { cartService } from "@/lib/services/cart.service";

function generateOrderNumber() {
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

class OrderService {
  /**
   * ایجاد سفارش جدید
   */
  async createOrder(userId: number, addressId: number) {
    // سبد خرید
    const cart = await cartService.getCart(userId);

    if (!cart || cart.items.length === 0) {
      throw new Error("سبد خرید خالی است.");
    }

    let subtotal = 0;
    let discount = 0;
    let total = 0;

    const items = cart.items.map((item) => {
      const productPrice = item.product.price;

      const discountPercent = item.product.discountPrice ?? 0;

      const finalPrice =
        discountPercent > 0
          ? Math.round(productPrice - (productPrice * discountPercent) / 100)
          : productPrice;

      const itemSubtotal = productPrice * item.quantity;

      const itemDiscount = (productPrice - finalPrice) * item.quantity;

      const itemTotal = finalPrice * item.quantity;

      subtotal += itemSubtotal;
      discount += itemDiscount;
      total += itemTotal;

      return {
        quantity: item.quantity,

        unitPrice: finalPrice,

        discount: discountPercent,

        totalPrice: itemTotal,

        productTitle: item.product.title,

        productImage: item.product.thumbnail ?? null,

        product: {
          connect: {
            id: item.productId,
          },
        },
      };
    });

    const order = await orderRepository.create({
      orderNumber: generateOrderNumber(),

      status: "PENDING",

      paymentStatus: "PENDING",

      subtotal,

      discount,

      shippingCost: 0,

      total,

      user: {
        connect: {
          id: userId,
        },
      },

      address: {
        connect: {
          id: addressId,
        },
      },

      items: {
        create: items,
      },
    });

    await cartService.clearCart(userId);

    return order;
  }

  /**
   * دریافت سفارش‌های کاربر
   */
  async getUserOrders(userId: number) {
    return orderRepository.findByUserId(userId);
  }

  /**
   * دریافت جزئیات سفارش
   */
  async getOrder(id: number, userId: number) {
    const order = await orderRepository.findById(id);

    if (!order) {
      throw new Error("سفارش پیدا نشد");
    }

    if (order.userId !== userId) {
      throw new Error("دسترسی غیرمجاز");
    }

    return order;
  }
}

export const orderService = new OrderService();
