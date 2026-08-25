import Popup from "@/components/ui/Popup";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type MenuItem = {
  label: string;
  value: string;
};

type JobActionMenuProps = {
  setMenuOpen: (open: boolean) => void;
  isMenuOpen: boolean;
  menuRef: React.RefObject<HTMLButtonElement | null>;
  menuLabel: string;
  menuIcon: LucideIcon;
  menuData: MenuItem[];
  menuCss?: string;
};

const JobActionMenu = ({
  setMenuOpen,
  isMenuOpen,
  menuRef,
  menuLabel,
  menuIcon: MenuIcon,
  menuData,
  menuCss=""
}: JobActionMenuProps) => {

  const isSort = menuLabel==="Sort By";
  
  
  return (
    <div className="relative flex">
      <button
        onClick={() => {
          setMenuOpen(!isMenuOpen);
        }}
        className="dashboard-btn"
        ref={menuRef}
      >
        <MenuIcon size={18} />
        {menuLabel}
      </button>

      <Popup
        isOpen={isMenuOpen}
        onClose={() => setMenuOpen(false)}
        anchorRef={menuRef}
        popupCss={`md:top-16 md:left-0 w-45 backdrop-blur-md transition-all duration-400 ease-in-out max-h-50 ${menuCss}`}
      >
        {menuData.map((item,index) => {

          const isString = typeof item === "string";

          const value = item.value;
           const label = item.label;

          return (
            <Link
              onClick={() => setMenuOpen(false)}
              href={`${isSort ? `?sortBy=${value}` : `?${value}`}`}
              className="px-6!"
              key={isString ? `${item}-${index}` : label}
            >
              {label}
            </Link>
          );
        })}
      </Popup>
    </div>
  );
};

export default JobActionMenu;
