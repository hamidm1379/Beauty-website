import { reportRepository } from "@/lib/repositories/report.repository";

class ReportService {
  async getReports(params?: {
    range?: string;

    from?: string;

    to?: string;
  }) {
    const [summary, salesChart, orderStatus, topProducts, financial] =
      await Promise.all([
        reportRepository.getSummary(params),

        reportRepository.getSalesChart(params),

        reportRepository.getOrderStatusChart(params),

        reportRepository.getTopProducts(params),

        reportRepository.getFinancialReport(params),
      ]);

    return {
      summary,

      salesChart,

      orderStatus,

      topProducts,

      financial,
    };
  }
}

export const reportService = new ReportService();
