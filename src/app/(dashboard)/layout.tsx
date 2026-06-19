"use client";
import Header from "@/components/shared/layout/Header";
import SideBar from "@/components/shared/layout/SideBar";
import { getUserProfile } from "@/services/userService";
import { useUIStore } from "@/stores/useUIStore";
import { useUserStore } from "@/stores/useUserStore";
import React, { Suspense, useEffect } from "react";
import { useStore } from "zustand";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { isMobile, isSidebarOpen } = useUIStore();
  const {setUser} = useStore(useUserStore);

  async function getProfileName() {
    const result = await getUserProfile();

    if(result.success && result.data) {
      setUser(result.data);
    }
  }

  useEffect(() => {
    getProfileName();
  }, [])
  return (
    <Suspense fallback={null}>
      <div className="h-dvh w-full flex overflow-hidden">
        <SideBar />
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          <Header />

          <main className={`flex-1 overflow-hidden p-3 md:p-4`}>
            <div
              className={`h-full overflow-y-auto rounded-lg shadow-2xl border border-slate-800 dashboard-content bg-slate-900 ${isMobile && isSidebarOpen ? "blur-3xl pointer-events-none select-none opacity-50 transition-all duration-300" : ""}`}
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
