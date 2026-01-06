import { JobApplication } from "@/types";
import { PlusCircle, PlusIcon, PlusSquare } from "lucide-react";
import Image from "next/image";
import React from "react";

type HeaderProps = {
  jobs: JobApplication[];
  handleModalOpen: (data?: JobApplication) => void;
};

const Header: React.FC<HeaderProps> = ({ jobs, handleModalOpen }) => {
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
      <div>
        <button
          className="font-semibold text-[15px] bg-indigo-800 rounded-md px-4 py-2 flex items-center gap-x-2"
          onClick={() => {
            handleModalOpen();
          }}
        >
          <PlusSquare size={18} />
          Add Jobs
        </button>
      </div>
    </header>
  );
};

export default Header;
