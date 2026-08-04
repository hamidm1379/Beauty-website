import DashboardCards from "@/app/features/admin/components/DashboardCards";
import RevenueChart from "@/app/features/admin/components/RevenueChart";
import OrdersTable from "@/app/features/admin/components/OrdersTable";
import Statistics from "@/app/features/admin/components/Statistics";
import TopProducts from "@/app/features/admin/components/TopProducts";
import RecentActivities from "@/app/features/admin/components/RecentActivities";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Cards */}
      <DashboardCards />

      {/* Charts */}
      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <RevenueChart />
        <Statistics />
      </section>

      {/* Tables */}
      <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <OrdersTable />
        <TopProducts />
      </section>

      {/* Activities */}
      <RecentActivities />
    </div>
  );
}