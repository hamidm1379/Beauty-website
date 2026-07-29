import type { Address, Order, OrderItem, Wishlist, Product, Brand } from "@prisma/client";

export interface AccountUser {
  id: number;
  username: string | null;
  firstName: string;
  lastName: string | null;
  email: string | null;
  phone: string;
  avatar: string | null;
  role: string;
  isActive: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: Date;
  addresses: Address[];
  orders: (Order & { items: OrderItem[]; address: Address })[];
  wishlist: (Wishlist & { product: Pick<Product, "id" | "title" | "slug" | "thumbnail" | "price" | "discountPrice" | "stock"> & { brand: Pick<Brand, "title"> | null } })[];
  _count: {
    orders: number;
    wishlist: number;
    reviews: number;
    addresses: number;
  };
}
