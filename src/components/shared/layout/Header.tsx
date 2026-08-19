"use client";
import { JobData } from "@/types/job.type";
import {
  ChevronDown,
  ChevronsRight,
  LogOut,
  Search,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Popup from "@/components/ui/Popup";
import { useStore } from "zustand";
import { useUIStore } from "@/stores/useUIStore";
import { useJobStore } from "@/stores/useJobStore";
import { searchJob } from "@/services/job.service";
import { useRouter, useSearchParams } from "next/navigation";
import { authLogout } from "@/services/auth.service";
import { capitalizeSentence } from "@/utils/utils";
import { useUserStore } from "@/stores/useUserStore";

const Header = () => {
  const { isSidebarOpen, toggleSidebar, isMobile } = useStore(useUIStore);

  const { search, setSearch, clearJobState } = useStore(useJobStore);
  const [jobSuggestion, setJobSuggestion] = useState([]);
  const [searchPopupOpen, setSearchPopupOpen] = useState(false);
  const searchBarRef = useRef(null);

  const [profilePopupOpen, setProfilePopupOpen] = useState(false);
  const profileRef = useRef(null);

  const { user } = useStore(useUserStore);

  const router = useRouter();
  const searchParams = useSearchParams();

  const companyName = searchParams.get("company");
  const position = searchParams.get("position");

  const logOut = async () => {
    setProfilePopupOpen(false);
    const flag = confirm("Are you sure want to logout!");
    if (flag) {
      const response = await authLogout();

      if (response.success) {
        clearJobState();
        router.push("/login");
      }
    }
  };

  const searchJobSuggestion = () => {
    const id = setTimeout(async () => {
      const job = await searchJob(search?.trim());
      setJobSuggestion(job ?? []);
    }, 800);

    return () => clearTimeout(id);
  };

  const handleSearchSubmit = (value: JobData) => {
    if (!value) return;

    const companyName = value.companyName.toLowerCase().replace(/\s+/g, "-");
    const position = value.position.toLocaleLowerCase().replace(/\s+/g, "-");

    const slug = `?company=${companyName}&position=${position}`;

    const fullPath = `/dashboard/jobs${slug}`;

    setSearch(`${value.companyName} - ${value.position}`);
    setSearchPopupOpen(false);
    router.push(fullPath);
  };

  useEffect(() => {
    const isSelected = search.includes(" - ");

    if (search.length > 0 && !isSelected) {
      setSearchPopupOpen(true);
    } else {
      setSearchPopupOpen(false);
    }
    return searchJobSuggestion();
  }, [search]);

  useEffect(() => {
    if (search && (!companyName || !position)) setSearch("");
    if (search || !companyName || !position) return;

    setSearch(
      capitalizeSentence(companyName.split("-")) +
        " - " +
        capitalizeSentence(position.split("-")),
    );
  }, [companyName, position]);


  return (
    <header
      className={`bg-surface flex items-center justify-between px-2.5 md:px-4 lg:px-6 py-2 border border-border/50 transition-all duration-500 ease-in-out relative`}
    >
      <ChevronsRight
        onClick={toggleSidebar}
        className={`text-text shrink-0 ${isSidebarOpen && "rotate-180"}`}
        size={isMobile ? 25 : 26}
      />

      <div
        className={`relative min-w-20 max-w-60 w-full md:max-w-sm ${isSidebarOpen ? "hidden md:block" : "block"}`}
      >
        <div
          className="flex-2 flex items-center gap-x-2 px-2 md:px-6 py-2 bg-background border-border/50 focus:border-border-hover/50 relative rounded-xl"
          ref={searchBarRef}
          onClick={() => {
            if (search.length > 0) {
              setSearchPopupOpen((prev) => !prev);
            }
          }}
        >
          <Search className="text-text"/>
          <input
            type="search"
            className="text-[16px] text-text placeholder:text-text w-full focus:outline-none"
            placeholder="Search job applications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Popup
          isOpen={searchPopupOpen}
          onClose={() => setSearchPopupOpen(false)}
          anchorRef={searchBarRef}
          popupCss="top-16 left-0 w-full backdrop-blur-md transition-all duration-400 ease-in-out"
        >
          {jobSuggestion.length === 0 ? (<span className="px-4 py-3 text-[16px]">
              No Job Application Found!
            </span>) : (jobSuggestion.map((val: JobData, idx) => {
            return (
              <div
                className="px-8 py-3 cursor-pointer"
                key={idx}
                onClick={() => handleSearchSubmit(val)}
              >
                <span className="text-[15px] font-medium">
                  {val.companyName} - {val.position}
                </span>
              </div>
            );
          }))}
         
         
        </Popup>
      </div>

      <div className="flex items-center gap-x-8 shrink-0">

        <button
          ref={profileRef}
          onClick={() => setProfilePopupOpen((prev) => !prev)}
          className={`flex gap-x-1 md:gap-x-3 p-2 px-4 rounded-4xl items-center hover:bg-background transition-colors ${profilePopupOpen && "bg-background"}`}
        >
          <span className="bg-blue-500 text-white w-7 md:w-8 aspect-square rounded-full flex items-center justify-center">
            {user?.name?.[0]}
          </span>
          <ChevronDown
            className={`transition-all duration-300 text-white ${profilePopupOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      <Popup
        isOpen={profilePopupOpen}
        onClose={() => setProfilePopupOpen(false)}
        anchorRef={profileRef}
        popupCss="bg-slate-800/80 top-20 right-4 w-48"
      >
        <button
          className="flex items-center gap-x-4"
          onClick={() => {
            router.push("/dashboard/profile");
            setProfilePopupOpen(false);
          }}
        >
          <User size={18} />
          My Profile
        </button>
        <button className="flex items-center gap-x-4" onClick={logOut}>
          <LogOut size={18} />
          Logout
        </button>
      </Popup>
    </header>
  );
};

export default Header;
