"use client";
import { JobData } from "@/types";
import { Bell, ChevronDown, ChevronRight, ChevronsRight, Kanban, LayoutDashboard, LogOut, PanelRight, Plus, Search, User } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Popup from "@/components/ui/Popup";
import { useStore } from "zustand";
import { useUIStore } from "@/stores/useUIStore";

// type HeaderProps = {
// handleModalOpen: (data?: JobData) => void;
// searchQuery: string;
// setSearchQuery: (query: string) => void;
// };

// const Header: React.FC<HeaderProps> = ({ handleModalOpen }) => {
const Header = () => {
  const {isSidebarOpen,toggleSidebar} = useStore(useUIStore);

  return (
    <header className={`flex items-center justify-between bg-slate-900/90 px-4 py-2 border border-slate-50/10 transition-all duration-500 ease-in-out`}>
      <ChevronsRight size={32} onClick={toggleSidebar} className={`text-blue-100 ${isSidebarOpen && "rotate-180"}`}/>
      <div className="w-full md:max-w-sm flex-2 flex items-center gap-x-2 px-6 py-2 bg-slate-800/80 relative rounded-xl">
        <Search />
        <input
          type="search"
          className="text-[16px] placeholder:text-white w-full focus:outline-none"
          placeholder="Search jobs..."
          // value={searchQuery}
          // onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-x-8">

        <Bell size={20}/>

        <button
          // ref={toggleRef}
          // onClick={() => setIsPopupOpen((prev) => !prev)}
          className={`flex gap-x-3 p-2 rounded-lg items-center hover:bg-slate-800/70 transition-colors `}
          // ${isPopupOpen && "bg-slate-800/70"}
        >
          <span className="bg-blue-500 w-8 aspect-square rounded-full flex items-center justify-center">
            S
          </span>
          <ChevronDown
            // className={`transition-all duration-300 ${isPopupOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      {/* <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        anchorRef={toggleRef}
        popupCss="top-20 right-4 w-48"
      >
        <button className="flex items-center gap-x-4">
          <User size={18} />
          My Profile
        </button>
        <button className="flex items-center gap-x-4">
          <LogOut size={18} />
          Logout
        </button>
      </Popup> */}
    </header>
  );
};

export default Header;
