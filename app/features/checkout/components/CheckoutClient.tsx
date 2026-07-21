"use client";

import { useState } from "react";

import ShippingForm, { AddressData } from "./ShippingForm";
import OrderSummary from "./OrderSummary";

interface CartItem {
  id: number;
  quantity: number;
  product: {
    title: string;
    price: number;
    discountPrice: number | null;
  };
}

interface Props {
  addresses: AddressData[];
  cartItems: CartItem[];
  initialCouponCode?: string;
}

export default function CheckoutClient({
  addresses: initialAddresses,
  cartItems,
  initialCouponCode,
}: Props) {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    initialAddresses.find((a) => a.isDefault)?.id ??
      initialAddresses[0]?.id ??
      null,
  );

  function handleAddressCreated(address: AddressData) {
    setAddresses((prev) => [address, ...prev]);
    setSelectedAddressId(address.id);
  }

  return (
    <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
      {/* Left */}
      <div className="space-y-8">
        <ShippingForm
          addresses={addresses}
          selectedAddressId={selectedAddressId}
          onSelectAddress={setSelectedAddressId}
          onAddressCreated={handleAddressCreated}
        />
      </div>

      {/* Right */}
      <aside className="h-fit lg:sticky lg:top-6">
        <OrderSummary
          items={cartItems}
          initialCouponCode={initialCouponCode}
          selectedAddressId={selectedAddressId}
        />
      </aside>
    </section>
  );
}