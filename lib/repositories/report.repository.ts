import { prisma } from "@/lib/prisma";

class ReportRepository {
  private getDateFilter(range?: string, from?: string, to?: string) {
    const now = new Date();

    if (range === "today") {
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      return {
        gte: start,
      };
    }

    if (range === "week") {
      const start = new Date();

      start.setDate(now.getDate() - 7);

      return {
        gte: start,
      };
    }

    if (range === "month") {
      const start = new Date();

      start.setMonth(now.getMonth() - 1);

      return {
        gte: start,
      };
    }

    if (from && to) {
      return {
        gte: new Date(from),

        lte: new Date(to),
      };
    }

    return undefined;
  }

  async getSummary(params?: {
    range?: string;

    from?: string;

    to?: string;
  }) {
    const createdAt = this.getDateFilter(
      params?.range,
      params?.from,
      params?.to,
    );

    const [orders, users, products, sales, items] = await Promise.all([
      prisma.order.count({
        where: {
          createdAt,
        },
      }),

      prisma.user.count({}),

      prisma.product.count({}),

      prisma.order.aggregate({
        where: {
          createdAt,

          status: "DELIVERED",
        },

        _sum: {
          total: true,
        },
      }),

      prisma.orderItem.aggregate({
        where: {
          order: {
            createdAt,
          },
        },

        _sum: {
          quantity: true,
        },
      }),
    ]);

    return {
      orders,

      users,

      products,

      sales: sales._sum.total ?? 0,

      soldItems: items._sum.quantity ?? 0,
    };
  }
  async getSalesChart(params?: {
    range?: string;

    from?: string;

    to?: string;
  }) {
    const orders = await prisma.order.findMany({
      where: {
        status: "DELIVERED",

        createdAt: this.getDateFilter(params?.range, params?.from, params?.to),
      },

      select: {
        total: true,

        createdAt: true,
      },

      orderBy: {
        createdAt: "asc",
      },
    });

    const grouped: Record<string, number> = {};

    orders.forEach((order) => {
      const date = order.createdAt.toISOString().split("T")[0];

      if (!grouped[date]) {
        grouped[date] = 0;
      }

      grouped[date] += order.total;
    });

    return Object.entries(grouped).map(([date, total]) => ({
      date,

      total,
    }));
  }
  async getOrderStatusChart(params?: {
    range?: string;

    from?: string;

    to?: string;
  }) {
    const data = await prisma.order.groupBy({
      by: ["status"],

      where: {
        createdAt: this.getDateFilter(params?.range, params?.from, params?.to),
      },

      _count: {
        id: true,
      },
    });

    return data.map((item) => ({
      status: item.status,

      count: item._count.id,
    }));
  }

  async getTopProducts(params?: {
    range?: string;

    from?: string;

    to?: string;
  }) {
    const products = await prisma.orderItem.groupBy({
      by: ["productId"],

      where: {
        order: {
          createdAt: this.getDateFilter(
            params?.range,
            params?.from,
            params?.to,
          ),

          status: "DELIVERED",
        },
      },

      _sum: {
        quantity: true,
      },

      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },

      take: 10,
    });

    const ids = products.map((item) => item.productId);

    const details = await prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },

      select: {
        id: true,

        title: true,

        thumbnail: true,
      },
    });

    return products.map((item) => {
      const product = details.find((p) => p.id === item.productId);

      return {
        id: item.productId,

        title: product?.title,

        thumbnail: product?.thumbnail,

        quantity: item._sum.quantity ?? 0,
      };
    });
  }
  async getFinancialReport(params?: {
    range?: string;

    from?: string;

    to?: string;
  }) {
    const orders = await prisma.order.findMany({
      where: {
        status: "DELIVERED",

        createdAt: this.getDateFilter(params?.range, params?.from, params?.to),
      },

      select: {
        subtotal: true,

        discount: true,

        shippingCost: true,

        total: true,

        items: {
          select: {
            quantity: true,

            unitPrice: true,

            product: {
              select: {
                purchasePrice: true,
              },
            },
          },
        },
      },
    });

    let grossSales = 0;

    let discount = 0;

    let shipping = 0;

    let netSales = 0;

    let profit = 0;

    const orderCount = orders.length;

    orders.forEach((order) => {
      grossSales += order.subtotal;

      discount += order.discount;

      shipping += order.shippingCost;

      netSales += order.total;

      order.items.forEach((item) => {
        const cost = item.product.purchasePrice * item.quantity;

        const income = item.unitPrice * item.quantity;

        profit += income - cost;
      });
    });

    const averageOrderValue = orderCount
      ? Math.round(netSales / orderCount)
      : 0;

    return {
      grossSales,

      discount,

      shipping,

      netSales,

      profit,

      orderCount,

      averageOrderValue,
    };
  }
}

export const reportRepository = new ReportRepository();
