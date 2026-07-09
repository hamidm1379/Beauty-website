"use client";

import { usePathname } from "next/navigation";

import Header from "@/app/shared/components/Header";
import Footer from "@/app/shared/components/Footer";
import { SessionProvider } from "next-auth/react";

interface LayoutProviderProps {
  children: React.ReactNode;
}

export default function LayoutProvider({ children }: LayoutProviderProps) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <SessionProvider>
        {!isAdmin && <Header />}

        {children}

        {!isAdmin && <Footer />}
      </SessionProvider>
    </>
  );
}
