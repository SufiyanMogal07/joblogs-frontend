"use client";
import { Briefcase, Plus, RotateCcw, SearchX, SortAsc} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useJobStore } from "@/stores/useJobStore";
import { JobData } from "@/types/job.type";
import JobPage from "@/components/features/jobs/page/JobPage";
import JobModal from "@/components/features/jobs/modal/JobModal";
import NotesModal from "@/components/features/jobs/modal/NotesModal";
import { useRouter, useSearchParams } from "next/navigation";
import JobDateModal from "../modal/JobDateModal";
import { getJobFilterData, getJobSortData } from "@/services/job.service";
import JobActionMenu from "../others/JobActionMenu";
import { filterDataType } from "@/types/job.type";
import { capitalizeWords, cleanUnderScore } from "@/utils/utils";

type JobsContentType = {
  query: string;
};

interface SortByDataType {
  value: string;
  label: string;
};

type FilterByDataType = SortByDataType;

const JobContent = ({ query }: JobsContentType) => {
  const {
    jobs,
    fetchJobs,
    createJob,
    updateJob,
    deleteJob,
    handlePriority,
    handleJobStatus,
    search,
    setSearch,
  } = useJobStore();

  const [editData, setEditData] = useState<JobData | null>(null);
  const [jobModalOpen, setJobModalOpen] = useState<boolean>(false);
  const [notesModalOpen, setNotesModalOpen] = useState<boolean>(false);
  const [notesId, setNotesId] = useState<string | null>(null);
  const router = useRouter();

  // sort states
  const [sortType, setSortType] = useState<SortByDataType[]>([]);
  const [sortPopup, setSortPopup] = useState<boolean>(false);
  const sortRef = useRef<HTMLButtonElement | null>(null);

  // filter states
  const [filterType, setFilterType] = useState<FilterByDataType[]>([]);
  const [filterPopup, setFilterPopup] = useState<boolean>(false);
  const filterRef = useRef<HTMLButtonElement | null>(null);

  const searchParams = useSearchParams();

   const isFilterActive = searchParams.get("status") || searchParams.get("source");
   const isSortActive = searchParams.get("sortBy");
   const activeMenu = isFilterActive || isSortActive;
   
   const isSearchActive = searchParams.get("company") && searchParams.get("position")

  const createOrUpdateJob = (data: JobData, id?: string) =>
    id ? updateJob(data) : createJob(data);

  const handleModalOpen = (data?: JobData) => {
    setJobModalOpen(true);
    if (data) {
      setEditData(data);
    } else {
      setEditData(null);
    }
  };

  const handleModalClose = () => {
    setJobModalOpen(false);
    setEditData(null);
  };

  const openNotesModal = (id: string) => {
    setNotesId(id);
    setNotesModalOpen(true);
  };

  const fetchSortData = async () => {
    try {
      const response = await getJobSortData();

      if (response.success && response.data) {
        setSortType(response.data);
      }
    } catch (error) {
      console.error("Error while fetching sortByData", error);
    }
  };

  function filterDataConverter(data: string[],type: "status" | "source") {
    if (!data || !Array.isArray(data) || data.length === 0) return [];

    return data.map((item) => {
      return { label: capitalizeWords(cleanUnderScore(item)), value: `${type}=${item}`};
    });
  }

  const fetchFilterData = async () => {
    try {
      const response: filterDataType = await getJobFilterData();
      const data = response.data;

      if (response.success && data.status && data.source) {
        const mergedFilterData = [
          ...filterDataConverter(data.status,"status"),
          ...filterDataConverter(data.source,"source"),
        ];

        setFilterType(mergedFilterData)
      }
    } catch (error) {
      console.error("Error while fetching filterbyData", error);
    }
  };

  const jobId = jobs?.findIndex((item) => item.id === notesId);

  useEffect(() => {
    fetchJobs(query);
  }, [query]);

  useEffect(() => {
    const loadFetchData = async () => {
      await fetchSortData();
      await fetchFilterData();
    };

    loadFetchData();
  }, []);

  return (
    <div>
      {/* Header Section */}
      <div className="w-full py-4 border-b border-border bg-amber-100/5 backdrop-blur-md z-50 sticky top-0">
        <div className="w-full flex flex-wrap justify-between gap-y-4">
          <div className="px-6 flex items-center gap-4">
            <span className="p-2 md:p-3 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Briefcase size={20} />
            </span>
            <h1 className="text-lg md:text-xl text-text font-bold tracking-wide">
              Job Applications
            </h1>
          </div>

          <div className="w-full px-4 md:w-auto mx-2 flex gap-x-5 md:justify-center flex-wrap gao-x-2 gap-y-6 md:gap-x-7 md:gap-y-4">

            {isSearchActive && (<button
              onClick={() => {
                setSearch("");
                router.push("/dashboard/jobs");
              }}
              className="dashboard-btn bg-red-950/40! border-red-900/50! text-red-400! hover:bg-red-900/60! hover:text-red-300!"
            >
              <SearchX size={16} /> Clear Search
            </button>)}
           

            {activeMenu && (<button
              onClick={() => {
                setSearch("");
                router.push("/dashboard/jobs");
              }}
              className="dashboard-btn bg-red-950/40! border-red-900/50! text-red-400! hover:bg-red-900/60! hover:text-red-300!"
            >
              <RotateCcw size={16} /> Reset
            </button>)}
            

            <JobActionMenu
              setMenuOpen={setSortPopup}
              isMenuOpen={sortPopup}
              menuRef={sortRef}
              menuLabel="Sort By"
              menuIcon={SortAsc}
              menuData={sortType}
              menuCss=""
            />

            <JobActionMenu
              setMenuOpen={setFilterPopup}
              isMenuOpen={filterPopup}
              menuRef={filterRef}
              menuLabel="Filter By"
              menuIcon={SortAsc}
              menuData={filterType}
              menuCss="left-0"
            />
            
            <button
              onClick={() => setJobModalOpen(true)}
              className="dashboard-btn bg-indigo-600! border-indigo-500! text-white! hover:bg-indigo-500! hover:border-indigo-400! shadow-sm"
            >
              <Plus size={16} />
              Add Job
            </button>
          </div>
        </div>
      </div>

      <JobPage
        jobs={jobs}
        handleModalOpen={handleModalOpen}
        deleteJob={deleteJob}
        searchQuery={search}
        handleFavoriteToggle={handlePriority}
        handleJobStatus={handleJobStatus}
        openNotesModal={openNotesModal}
        isFilterActive={!!isFilterActive}
      />

      <JobDateModal />

      <JobModal
        key={editData?.id ?? "new"}
        isEdit={!!editData}
        isModalOpen={jobModalOpen}
        setIsModalOpen={setJobModalOpen}
        handleModalClose={handleModalClose}
        createorUpdateJob={createOrUpdateJob}
        editData={editData}
      />

      <NotesModal
        isModalOpen={notesModalOpen}
        setIsModalOpen={setNotesModalOpen}
        notes={jobs[jobId]?.notes}
      />

      {/* <div className="block md:hidden bottom-8 left-[50%] translate-x-[-50%] rounded-full overflow-hidden fixed bg-slate-700 p-3">
        <div className="flex gap-x-2">
          <span className="flex items-center gap-x-2 border-r-white">
          <FilterIcon size={16}/>
           Filter By
           </span>
          <span className="flex items-center gap-x-2">
            <SortAsc size={16}/>
            Sort By
            </span>
        </div>
      </div> */}
    </div>
  );
};

export default JobContent;
