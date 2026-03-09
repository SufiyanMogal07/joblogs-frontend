import { JobData } from "@/types";
import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

type HeaderProps = {
  handleModalOpen: (data?: JobData) => void;
};

const Header: React.FC<HeaderProps> = ({ handleModalOpen }) => {
  
  return (
    <header className="header flex items-center justify-between">
      <div className="w-38 h-20 relative">
        <Image
          src={"/images/joblogLogo.png"}
          className="scale-120"
          fill
          loading="eager"
          alt="JobLog Logo"
        />
      </div>
      <div className="flex items-center gap-x-8">
        <button
          className="font-semibold text-[15px] bg-indigo-700 hover:bg-indigo-800 rounded-lg px-4 py-2 duration-200 flex items-center gap-x-1"
          onClick={() => {
            handleModalOpen();
          }}
        >
          <Plus size={18} />
          Add Jobs
        </button>
        <button className="flex gap-x-3 items-center ">
          My Profile  
        </button>
      </div>
    </header>
  );
};

export default Header;
