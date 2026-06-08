"use client";
import Header from "@/components/shared/layout/Header";
import SideBar from "@/components/shared/layout/SideBar";
import { useUIStore } from "@/stores/useUIStore";
import React, { Suspense } from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { isMobile, isSidebarOpen } = useUIStore();

  return (
    <Suspense fallback={null}>
      <div className="h-screen w-full flex overflow-hidden">
        <SideBar />
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          <Header />

          <main className={`flex-1 overflow-hidden p-3 md:p-4`}>
            <div
              className={`h-full overflow-y-auto rounded-lg shadow-2xl border border-slate-800 dashboard-content bg-slate-900 ${isMobile && isSidebarOpen ? "blur-3xl" : ""}`}
            >
              {children}
            </div>
          </main>
        </div>
      </div>
    </Suspense>
  );
};

export default Layout;
