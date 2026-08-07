import { prisma } from "@/lib/prisma";

export type ActivityType =
  | "order"
  | "user"
  | "review"
  | "stock";

export interface Activity {
  id: string;
  title: string;
  description: string;
  time: Date;
  type: ActivityType;
}

function timeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  const diffHour = Math.floor(diffMs / 3_600_000);
  const diffDay = Math.floor(diffMs / 86_400_000);

  if (diffMin < 1) return "همین الان";
  if (diffMin < 60) return `${diffMin} دقیقه پیش`;
  if (diffHour < 24) return `${diffHour} ساعت پیش`;
  if (diffDay < 7) return `${diffDay} روز پیش`;
  return date.toLocaleDateString("fa-IR");
}

class ActivityService {
  async getRecentActivities(limit = 10): Promise<Activity[]> {
    const [recentOrders, recentUsers, recentReviews, lowStockProducts] =
      await Promise.all([
        prisma.order.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
          select: {
            id: true,
            createdAt: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
              },
            },
          },
        }),

        prisma.user.findMany({
          orderBy: { createdAt: "desc" },
          take: 3,
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            createdAt: true,
          },
        }),

        prisma.review.findMany({
          orderBy: { createdAt: "desc" },
          take: 3,
          select: {
            id: true,
            rating: true,
            createdAt: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
            product: {
              select: {
                title: true,
              },
            },
          },
        }),

        prisma.product.findMany({
          where: {
            stock: { lte: 10 },
            stock: { gt: 0 },
          },
          orderBy: { stock: "asc" },
          take: 2,
          select: {
            id: true,
            title: true,
            stock: true,
          },
        }),
      ]);

    const activities: Activity[] = [];

    for (const order of recentOrders) {
      const name =
        [order.user.firstName, order.user.lastName]
          .filter(Boolean)
          .join(" ") || order.user.phone;
      activities.push({
        id: `order-${order.id}`,
        title: "سفارش جدید ثبت شد",
        description: `${name} سفارش #${order.id} را ثبت کرد.`,
        time: order.createdAt,
        type: "order",
      });
    }

    for (const user of recentUsers) {
      const name =
        [user.firstName, user.lastName].filter(Boolean).join(" ") ||
        user.phone;
      activities.push({
        id: `user-${user.id}`,
        title: "کاربر جدید ثبت نام کرد",
        description: `کاربر ${name} ایجاد شد.`,
        time: user.createdAt,
        type: "user",
      });
    }

    for (const review of recentReviews) {
      const name =
        [review.user.firstName, review.user.lastName]
          .filter(Boolean)
          .join(" ") || "کاربر";
      const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
      activities.push({
        id: `review-${review.id}`,
        title: review.rating >= 4 ? "نظر مثبت ثبت شد" : "نظر جدید ثبت شد",
        description: `${name} به محصول «${review.product.title}» امتیاز ${stars} داد.`,
        time: review.createdAt,
        type: "review",
      });
    }

    for (const product of lowStockProducts) {
      activities.push({
        id: `stock-${product.id}`,
        title: "موجودی محصول کم شد",
        description: `موجودی «${product.title}» به ${product.stock} عدد رسید.`,
        time: new Date(),
        type: "stock",
      });
    }

    activities.sort((a, b) => b.time.getTime() - a.time.getTime());

    return activities.slice(0, limit).map((a) => ({
      ...a,
      timeAgo: timeAgo(a.time),
    }));
  }
}

export const activityService = new ActivityService();
