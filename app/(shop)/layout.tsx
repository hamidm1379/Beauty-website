// app/(shop)/layout.tsx

import Header from "@/app/shared/components/Header";
import Footer from "@/app/shared/components/Footer";

interface Props {
  children: React.ReactNode;
}

export default function ShopLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-5">
        {children}
      </main>

      <Footer />
    </div>
  );
}