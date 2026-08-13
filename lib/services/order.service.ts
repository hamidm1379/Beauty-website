import { orderRepository } from "@/lib/repositories/order.repository";
import { cartService } from "@/lib/services/cart.service";

import { OrderStatus } from "@prisma/client";

function generateOrderNumber() {
  return `${Date.now()}`;
}

class OrderService {
  // =================================================
  // ADMIN
  // =================================================

  /**
   * لیست سفارش‌ها برای ادمین
   */
  async getPendingCount() {
    return orderRepository.countPending();
  }

  async findByOrderNumber(orderNumber: string, userId: number) {
    return orderRepository.findByOrderNumber(orderNumber, userId);
  }
  async getAdminOrder(id: number) {
    const order = await orderRepository.findAdminById(id);

    if (!order) {
      throw new Error("سفارش پیدا نشد");
    }

    return order;
  }

  async addTrackingCode(id: number, code: string) {
    return orderRepository.updateTrackingCode(id, code);
  }
  async getAdminOrders(params?: {
    status?: OrderStatus;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    return orderRepository.findAll(params);
  }

  /**
   * تعداد سفارش‌ها
   */
  async getOrderCount(params?: {
    status?: OrderStatus;
  }) {
    return orderRepository.count(params);
  }

  /**
   * تغییر وضعیت سفارش
   */
  async changeOrderStatus(
    id: number,

    status: OrderStatus,
  ) {
    const order = await orderRepository.findById(id);

    if (!order) {
      throw new Error("سفارش پیدا نشد");
    }

    return orderRepository.updateStatus(id, status);
  }

  /**
   * تغییر اطلاعات مدیریتی سفارش
   */
  async updateAdminInfo(
    id: number,

    data: {
      trackingCode?: string;

      notes?: string;
    },
  ) {
    const order = await orderRepository.findById(id);

    if (!order) {
      throw new Error("سفارش پیدا نشد");
    }

    return orderRepository.updateAdminInfo(id, data);
  }

  /**
   * آمار داشبورد ادمین
   */
  async getStats() {
    return orderRepository.getStats();
  }

  // =================================================
  // CUSTOMER
  // =================================================

  /**
   * ایجاد سفارش جدید
   */
  async createOrder(
    userId: number,

    addressId: number,
  ) {
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
        purchasePrice: item.product.purchasePrice,

        variantId: item.variantId ?? null,
        variantTitle: item.variant?.title ?? null,
        variantColor: item.variant?.colorName ?? null,

        product: {
          connect: {
            id: item.productId,
          },
        },
      };
    });

    const order = await orderRepository.create({
      orderNumber: generateOrderNumber(),

      status: OrderStatus.PENDING,

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
   * سفارش‌های کاربر
   */
  async getUserOrders(userId: number) {
    return orderRepository.findByUserId(userId);
  }

  /**
   * جزئیات سفارش کاربر
   */
  async getOrder(
    id: number,

    userId: number,
  ) {
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
