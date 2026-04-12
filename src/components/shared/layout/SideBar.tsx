"use client";
import { useUIStore } from "@/stores/useUIStore";
import { BriefcaseBusiness, Home, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // New import
import React from "react";
import { useStore } from "zustand";

const SideBar = () => {
  const { isSidebarOpen } = useStore(useUIStore);
  const pathname = usePathname(); // Current route track karne ke liye

  const sideBarValue = [
    { id: 1, name: "Home", icon: Home, url: "/dashboard" },
    { id: 2, name: "Jobs", icon: BriefcaseBusiness, url: "/dashboard/jobs" },
  ];

  return (
    <aside
      className={`h-screen bg-slate-900 border-r border-slate-50/10 flex flex-col transition-all duration-300 ease-in-out shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-center border-b border-slate-50/10 shrink-0">
        <h1 className="text-amber-500 font-bold text-2xl tracking-tighter">
          {isSidebarOpen ? (
            <span>
              JOB<span className="text-white">LOG</span>
            </span>
          ) : (
            "JL"
          )}
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-3 flex flex-col gap-y-3">
        {sideBarValue.map((item) => {
          const IconComponent = item.icon;
          const isActive = pathname === item.url;

          return (
            <Link
              href={item.url}
              key={item.id}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group
              ${
                isActive
                  ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white border-transparent  "
              }
              ${isSidebarOpen ? "justify-start" : "justify-center"}`}
            >
              <IconComponent
                size={22}
                className={
                  isActive ? "text-amber-500" : "group-hover:text-amber-500"
                }
              />

              {isSidebarOpen && (
                <span className="text-[15px] font-medium transition-opacity duration-300">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Section (Profile/Logout) - Always at bottom */}
      <div className="border-t border-slate-50/10 py-4 px-7">
        <button className="flex items-center gap-4 w-full text-red-400 hover:text-red-400/90 transition-colors">
          <LogOut size={22} />
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
