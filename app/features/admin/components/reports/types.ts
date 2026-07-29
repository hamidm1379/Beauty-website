import type { OrderStatus } from "@prisma/client";

/** خروجی getSummary از report.repository. */
export interface ReportSummary {
  orders: number;
  users: number;
  products: number;
  sales: number;
  soldItems: number;
}

/** خروجی getFinancialReport از report.repository. */
export interface FinancialReport {
  grossSales: number;
  discount: number;
  shipping: number;
  netSales: number;
  profit: number;
  orderCount: number;
  averageOrderValue: number;
}

/** یک نقطه‌ی نمودار فروش (خروجی getSalesChart). */
export interface SalesPoint {
  date: string;
  total: number;
}

/** یک ردیف نمودار وضعیت سفارش (خروجی getOrderStatusChart). */
export interface OrderStatusPoint {
  status: OrderStatus;
  count: number;
}

/** یک ردیف محصولات پرفروش (خروجی getTopProducts). */
export interface TopProduct {
  id: number;
  title: string | null | undefined;
  thumbnail: string | null | undefined;
  quantity: number;
}
