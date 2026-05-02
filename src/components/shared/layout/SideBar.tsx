"use client";
import { authLogout } from "@/services/authService";
import { useUIStore } from "@/stores/useUIStore";
import { BriefcaseBusiness, Home, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // New import
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SideBar = () => {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const isMobile = useUIStore((state) => state.isMobile);
  const setIsMobile = useUIStore((state) => state.setIsMobile);
  const pathname = usePathname();
  const router = useRouter();

  const sideBarValue = [
    { id: 1, name: "Home", icon: Home, url: "/dashboard" },
    { id: 2, name: "Jobs", icon: BriefcaseBusiness, url: "/dashboard/jobs" },
    { id: 3, name: "Profile", icon: User, url: "/dashboard/profile" },
  ];

  const logOut = async () => {
    const response = await authLogout();

    if (response.success) router.push("/login");
  };

  useEffect(() => {
    const handleResize = () => {
      console.log("Handle Resize Done...");
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = isSidebarOpen ? "w-48 md:w-60" : "w-16 md:w-20";

  return (
    <aside
      className={`h-screen bg-slate-900 border-slate-50/10 flex flex-col transition-all duration-200 ease-in-out shrink-0 ${sidebarWidth}`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-center border-b border-slate-50/10 shrink-0 py-4">
        <h1 className="font-sans text-amber-500 font-bold text-2xl tracking-tighter">
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
      <nav className="flex-1 py-6 px-2 md:px-3 flex flex-col gap-y-3">
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
                size={20}
                className={` ${isActive ? "text-amber-500" : "group-hover:text-amber-500"}`
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
      <div className="border-t border-slate-50/10 flex justify-center px-5 py-4 md:px-7">
        <button
          onClick={() => {
            const flag = confirm("Are you sure want to logout!");

            if (flag) {
              logOut();
            }
          }}
          className="flex items-center gap-4 w-full text-red-400 hover:text-red-400/90 transition-colors"
        >
          <LogOut size={isMobile ? 19 : 24} />
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
