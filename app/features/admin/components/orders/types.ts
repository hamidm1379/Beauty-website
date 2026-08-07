import type { OrderStatus } from "@prisma/client";

/** یک آیتم سفارش برای نمایش در پنل ادمین. */
export interface AdminOrderItem {
  id: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productTitle: string;
  productImage: string | null;
  productId: number;
  variantTitle: string | null;
  variantColor: string | null;
  discount?: number;
}

/** کاربر مرتبط با سفارش. */
export interface OrderUser {
  id: number;
  firstName: string;
  lastName: string | null;
  phone: string;
  email?: string | null;
}

/** آدرس ارسال سفارش. */
export interface OrderAddress {
  id: number;
  title: string;
  receiverName: string;
  receiverPhone: string;
  province: string;
  city: string;
  postalCode: string;
  addressLine: string;
  plaque?: string | null;
  unit?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  isDefault: boolean;
}

/** سفارش برای نمایش در پنل ادمین. */
export interface AdminOrder {
  id: number;
  orderNumber: string;
  status: OrderStatus;
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  trackingCode: string | null;
  notes: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  user: OrderUser;
  address: OrderAddress;
  items: AdminOrderItem[];
}
