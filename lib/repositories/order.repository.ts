import { prisma } from "@/lib/prisma";
import { OrderStatus, PaymentStatus, Prisma } from "@prisma/client";

class OrderRepository {
  async findByOrderNumber(orderNumber: string, userId: number) {
    return prisma.order.findFirst({
      where: {
        orderNumber,
        userId,
      },
      include: {
        items: true,
        address: true,
        coupon: true,
      },
    });
  }
  /**
   * ایجاد سفارش
   */
  async create(data: Prisma.OrderCreateInput) {
    return prisma.order.create({
      data,

      include: {
        items: true,

        address: true,
      },
    });
  }

  /**
   * لیست سفارش‌های کاربر
   */
  async findByUserId(userId: number) {
    return prisma.order.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: "desc",
      },

      include: {
        items: {
          include: {
            product: true,
          },
        },

        address: true,
      },
    });
  }

  /**
   * دریافت جزئیات سفارش
   */
  async findById(id: number) {
    return prisma.order.findUnique({
      where: {
        id,
      },

      include: {
        user: {
          select: {
            id: true,

            firstName: true,

            lastName: true,

            phone: true,

            email: true,
          },
        },

        address: true,

        items: {
          include: {
            product: true,
          },
        },

        coupon: true,
      },
    });
  }

  // =================================================
  // ADMIN
  // =================================================

  /**
   * لیست تمام سفارش‌ها برای ادمین
   */
  async findAll(params?: {
    status?: OrderStatus;
    paymentStatus?: PaymentStatus;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const {
      status,
      paymentStatus,
      search,
      page = 1,
      limit = 10,
    } = params ?? {};

    const where: Prisma.OrderWhereInput = {
      ...(status && { status }),
      ...(paymentStatus && { paymentStatus }),
      ...(search?.trim() && {
        OR: [
          { orderNumber: { contains: search } },
          { trackingCode: { contains: search } },
          { user: { firstName: { contains: search } } },
          { user: { lastName: { contains: search } } },
          { user: { phone: { contains: search } } },
        ],
      }),
    };

    const [items, total] = await prisma.$transaction([
      prisma.order.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              phone: true,
              email: true,
            },
          },
          address: true,
          items: {
            include: {
              product: true,
            },
          },
          coupon: true,
        },
      }),
      prisma.order.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * تعداد سفارش‌ها
   */
  async count(params?: {
    status?: OrderStatus;

    paymentStatus?: PaymentStatus;
  }) {
    return prisma.order.count({
      where: {
        ...(params?.status && {
          status: params.status,
        }),

        ...(params?.paymentStatus && {
          paymentStatus: params.paymentStatus,
        }),
      },
    });
  }

  /**
   * تغییر وضعیت سفارش
   */
  async updateStatus(
    id: number,

    status: OrderStatus,
  ) {
    return prisma.order.update({
      where: {
        id,
      },

      data: {
        status,
      },
    });
  }

  /**
   * تغییر وضعیت پرداخت
   */
  async updatePaymentStatus(
    id: number,

    paymentStatus: PaymentStatus,
  ) {
    return prisma.order.update({
      where: {
        id,
      },

      data: {
        paymentStatus,
      },
    });
  }

  /**
   * تغییر اطلاعات مدیریتی سفارش
   * مثل کد رهگیری و توضیحات
   */
  async updateAdminInfo(
    id: number,

    data: {
      trackingCode?: string;

      notes?: string;

      paymentRef?: string;
    },
  ) {
    return prisma.order.update({
      where: {
        id,
      },

      data,
    });
  }

  /**
   * سفارش‌های یک کاربر با صفحه‌بندی
   */
  async findUserOrdersPaginated(
    userId: number,

    page: number = 1,

    limit: number = 10,
  ) {
    const [orders, total] = await prisma.$transaction([
      prisma.order.findMany({
        where: {
          userId,
        },

        orderBy: {
          createdAt: "desc",
        },

        skip: (page - 1) * limit,

        take: limit,

        include: {
          items: true,

          address: true,
        },
      }),

      prisma.order.count({
        where: {
          userId,
        },
      }),
    ]);

    return {
      orders,

      total,

      page,

      limit,

      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * آمار سفارش‌ها برای داشبورد ادمین
   */
  async getStats() {
    const [
      totalOrders,

      pendingOrders,

      deliveredOrders,

      cancelledOrders,

      totalRevenue,
    ] = await prisma.$transaction([
      prisma.order.count(),

      prisma.order.count({
        where: {
          status: "PENDING",
        },
      }),

      prisma.order.count({
        where: {
          status: "DELIVERED",
        },
      }),

      prisma.order.count({
        where: {
          status: "CANCELLED",
        },
      }),

      prisma.order.aggregate({
        _sum: {
          total: true,
        },

        where: {
          paymentStatus: "PAID",
        },
      }),
    ]);

    return {
      totalOrders,

      pendingOrders,

      deliveredOrders,

      cancelledOrders,

      totalRevenue: totalRevenue._sum.total ?? 0,
    };
  }
  async findAdminById(id: number) {
    return prisma.order.findUnique({
      where: {
        id,
      },

      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            email: true,
          },
        },

        address: true,

        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async updateTrackingCode(id: number, trackingCode: string) {
    return prisma.order.update({
      where: {
        id,
      },

      data: {
        trackingCode,
      },
    });
  }
  async countPending() {
    return prisma.order.count({
      where: { status: OrderStatus.PENDING },
    });
  }
}

export const orderRepository = new OrderRepository();
