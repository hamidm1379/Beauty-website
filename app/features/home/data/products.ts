export interface Product {
  id: string;
  title: string;
  slug: string;

  image: string;

  brand: string;

  price: number;

  oldPrice?: number;

  discount?: number;
}

export const bestSellerProducts: Product[] = [
  {
    id: "1",
    title: "سرم هیالورونیک ",
    slug: "serum",
    image: "/hero3.png",
    brand: "The Ordinary",
    price: 980000,
  },
  {
    id: "2",
    title: "سرم هیالورونیک اسید",
    slug: "serum2",
    image: "/hero4.png",
    brand: "The Ordinary",
    price: 9800000,
  },
  {
    id: "3",
    title: "سرم اسید",
    slug: "serum3",
    image: "/hero2.png",
    brand: "The Ordinary",
    price: 90000,
  },
  {
    id: "4",
    title: "سرم اسید",
    slug: "serum3",
    image: "/hero2.png",
    brand: "The Ordinary",
    price: 90000,
  },
  {
    id: "5",
    title: "سرم اسید",
    slug: "serum3",
    image: "/hero2.png",
    brand: "The Ordinary",
    price: 90000,
  },
  {
    id: "6",
    title: "سرم اسید",
    slug: "serum3",
    image: "/hero2.png",
    brand: "The Ordinary",
    price: 90000,
  },
  {
    id: "7",
    title: "سرم اسید",
    slug: "serum3",
    image: "/hero2.png",
    brand: "The Ordinary",
    price: 90000,
  },
  {
    id: "8",
    title: "سرم اسید",
    slug: "serum3",
    image: "/hero2.png",
    brand: "The Ordinary",
    price: 2450000,
    oldPrice: 3200000,
    discount: 20,
  },
];

export const newProducts = [...bestSellerProducts];

export const discountProducts = [
  {
    id: "2",
    title: "کرم پودر استی لادر",
    slug: "foundation",
    image: "/products/foundation.png",
    brand: "Estee Lauder",
    price: 2450000,
    oldPrice: 3200000,
    discount: 20,
  },
];