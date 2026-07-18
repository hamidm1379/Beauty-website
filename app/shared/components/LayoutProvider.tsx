"use client";

import { SessionProvider } from "next-auth/react";

interface LayoutProviderProps {
  children: React.ReactNode;
}

export default function LayoutProvider({ children }: LayoutProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
