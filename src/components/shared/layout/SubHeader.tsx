import { Search } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { JOB_STATUS,JobStatus } from "@/constants/enums";

type SubHeaderProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  filter: string;
  setFilter: Dispatch<SetStateAction<JobStatus>>;
};

const SubHeader: React.FC<SubHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
  
}) => {
  return (
    <div className="mt-2 px-8 py-2 relative flex flex-col md:flex-row md:items-center gap-3 md:flex-wrap  ">
      {/* <div className="w-full md:max-w-sm flex-2 flex items-center gap-x-2 px-6 py-3 bg-slate-800/80 relative rounded-xl">
        <Search />
        <input
          type="search"
          className="text-[16px] placeholder:text-white w-full focus:outline-none"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div> */}

      {/* <div className="flex">
        <div className="select-input">
          <span className="text-[16px]">Status Filter: </span>
          <select
            id="jobStatus"
            onChange={(e) => setFilter(e.target.value as JobStatus)}
            value={filter}
          >
            <option defaultChecked value={""}>
              All
            </option>
            {JOB_STATUS.map((status, idx) => {
              return (
                <option key={idx} value={status.toLowerCase()}>
                  {status}
                </option>
              );
            })}
          </select>
        </div>
      </div> */}
    </div>
  );
};

export default SubHeader;
