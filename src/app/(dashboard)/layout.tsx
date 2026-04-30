import Header from "@/components/shared/layout/Header";
import SideBar from "@/components/shared/layout/SideBar";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-dvh md:h-screen w-full flex overflow-hidden">
      <SideBar />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <Header />

        <main className="flex-1 overflow-hidden p-3 md:p-4">
          <div className="h-full overflow-y-auto bg-slate-900 rounded-lg shadow-2xl border border-slate-800 dashboard-content">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};

export default Layout;
