"use client";

import { createContext, useContext, useState, useCallback } from "react";
import AdminSidebar from "./AdminSidebar";

interface SidebarContextValue {
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  toggle: () => {},
});

export function useSidebarToggle() {
  return useContext(SidebarContext);
}

interface Props {
  children: React.ReactNode;
  role: string;
}

export default function AdminShell({ children, role }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggle = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <SidebarContext.Provider value={{ toggle }}>
      <AdminSidebar role={role} open={sidebarOpen} onClose={close} />

      <div className="flex-1 lg:mr-72.5">
        {children}
      </div>
    </SidebarContext.Provider>
  );
}
