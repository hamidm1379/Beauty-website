import DashboardCards from "@/app/features/admin/components/DashboardCards";
import RevenueChart from "@/app/features/admin/components/RevenueChart";
import OrdersTable from "@/app/features/admin/components/OrdersTable";
import Statistics from "@/app/features/admin/components/Statistics";
import TopProducts from "@/app/features/admin/components/TopProducts";
// import RecentActivities from "@/app/features/admin/components/RecentActivities";

import { orderService } from "@/lib/services/order.service";
import { productService } from "@/lib/services/product.service";
import { userService } from "@/lib/services/user.service";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const session = await auth();
  const role = session?.user?.role;

  if (role === "SUPPORT") {
    redirect("/admin/orders");
  }

  const [orderStats, productStats, userStats, recentOrders, bestSellers] =
    await Promise.all([
      orderService.getStats(),
      productService.getStatistics(),
      userService.getStats(),
      orderService.getAdminOrders({ limit: 5 }),
      productService.findBestSellers(4),
    ]);

  const dashboardData = {
    totalRevenue: orderStats.totalRevenue ?? 0,
    totalOrders: orderStats.totalOrders,
    totalUsers: userStats.totalUsers,
    totalProducts: productStats.totalProducts,
    activeProducts: productStats.activeProducts,
    outOfStockProducts: productStats.outOfStockProducts,
    pendingOrders: orderStats.pendingOrders,
    deliveredOrders: orderStats.deliveredOrders,
    cancelledOrders: orderStats.cancelledOrders,
    activeUsers: userStats.activeUsers,
  };

  const ordersForTable = recentOrders.items.map((order) => ({
    id: `#${order.id}`,
    customer:
      [order.user.firstName, order.user.lastName].filter(Boolean).join(" ") ||
      order.user.phone,
    date: new Date(order.createdAt).toLocaleDateString("fa-IR"),
    amount: order.total.toLocaleString("fa-IR"),
    status: order.status.toLowerCase() as
      | "completed"
      | "shipping"
      | "pending"
      | "cancelled",
  }));

  const topProductsData = bestSellers.map((product) => ({
    id: product.id,
    name: product.title,
    image: product.thumbnail ?? "/images/no-image.png",
    category: product.brand?.title ?? "نامشخص",
    sales: product.soldCount,
    revenue: product.price.toLocaleString("fa-IR"),
  }));

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Cards */}
      <DashboardCards data={dashboardData} />

      {/* Charts */}
      <section className="grid gap-4 sm:gap-6 xl:grid-cols-[2fr_1fr]">
        <RevenueChart data={dashboardData} />
        <Statistics data={dashboardData} />
      </section>

      {/* Tables */}
      <section className="grid gap-4 sm:gap-6 xl:grid-cols-[1.7fr_1fr]">
        <OrdersTable orders={ordersForTable} />
        <TopProducts products={topProductsData} />
      </section>

      {/* Activities */}
      {/* <RecentActivities /> */}
    </div>
  );
}
