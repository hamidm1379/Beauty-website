// app/(shop)/layout.tsx

import Header from "@/app/shared/components/Header";
import Footer from "@/app/shared/components/Footer";
import { contactService } from "@/lib/services/contact.service";

interface Props {
  children: React.ReactNode;
}

export default async function ShopLayout({ children }: Props) {
  const footerData = await contactService.getFooterData();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-0">
        {children}
      </main>

      <Footer data={footerData} />
    </div>
  );
}