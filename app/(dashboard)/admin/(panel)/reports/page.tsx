import { reportService } from "@/lib/services/report.service";

import DateFilter from "@/app/features/admin/components/reports/DateFilter";

import ReportCards from "@/app/features/admin/components/reports/ReportCards";
import SalesChart from "@/app/features/admin/components/reports/SalesChart";
import OrderStatusChart from "@/app/features/admin/components/reports/OrderStatusChart";
import TopProducts from "@/app/features/admin/components/reports/TopProducts";
import FinancialCards from "@/app/features/admin/components/reports/FinancialCards";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{
    range?: string;
  }>;
}) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect("/admin/orders");
  }

  const params = await searchParams;

  const reports = await reportService.getReports({
    range: params.range,
  });

  return (
    <div className="space-y-5 sm:space-y-8">
      <h1 className="text-xl sm:text-3xl font-black">
        گزارشات فروش
      </h1>

      <DateFilter />
      <ReportCards data={reports.summary} />
      <FinancialCards data={reports.financial} />
      <SalesChart data={reports.salesChart} />
      <div className="grid gap-3 sm:gap-6 lg:grid-cols-2">
        <OrderStatusChart data={reports.orderStatus} />
        <TopProducts data={reports.topProducts} />
      </div>
    </div>
  );
}