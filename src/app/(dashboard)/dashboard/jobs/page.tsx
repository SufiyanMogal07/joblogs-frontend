"use client";
import { Briefcase, FilterIcon, Plus, SearchX, SortAsc, X } from "lucide-react";
import React, { Suspense, useEffect, useState } from "react";
import { useUIStore } from "@/stores/useUIStore";
import { useJobStore } from "@/stores/useJobStore";
import { JobApplication, JobData } from "@/types";
import { JobStatus } from "@/constants/enums";
import { updateJob } from "@/services/jobService";
import JobPage from "@/components/features/jobs/JobPage";
import JobModal from "@/components/features/jobs/JobModal";
import NotesModal from "@/components/features/jobs/NotesModal";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const JobsContent = () => {
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
  const [notesId, setNotesId] = useState<number | null>(null);
  const [filter, setFilter] = useState<JobStatus>(
    "" as JobApplication["status"],
  );
  const router = useRouter();
  const searchParam = useSearchParams();
  const query = searchParam.toString();

  const createOrUpdateJob = (data: JobData, id?: number) =>
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

  const openNotesModal = (id: number) => {
    setNotesId(id);
    setNotesModalOpen(true);
  };

  useEffect(() => {
    fetchJobs(query);
  }, [query]);

  const jobId = jobs.findIndex((item) => item.id === notesId) ?? 0;

  return (
    <div>
      {/* Header Section */}
      <div className="w-full py-4 bg-zinc-800/35 border-b border-zinc-100/10 backdrop-blur-sm z-50 gap-y-4 sticky top-0 overflow-hidden flex justify-between flex-wrap">
        {/* <div className="w-full flex"> */}
        <div className="px-6 flex items-center gap-4">
          <span className="p-2 md:p-3 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Briefcase size={20} />
          </span>
          <h1 className="text-lg md:text-xl font-bold tracking-wide">
            Job Applications
          </h1>
        </div>

        <div className="px-4 md:w-auto mx-2 flex justify-center gap-x-6 gap-y-4">
          {/* <button
              onClick={() => {}}
              className="dashboard-btn hidden! md:block!"
            >
              <SortAsc size={16} />
              Sort By
            </button>

            <button
              onClick={() => {}}
              className="dashboard-btn hidden! md:block!"
            >
              <FilterIcon size={16} />
              Filter By
            </button> */}

          <button
            onClick={() => {
              setSearch("");
              router.push("/dashboard/jobs");
            }}
            className="dashboard-btn bg-red-950/40! border-red-900/50! text-red-400! hover:bg-red-900/60! hover:text-red-300!"
          >
            <SearchX size={16} />{" "}
            {/* Slightly smaller icon to balance the text */}
            Clear Search
          </button>

          <button
            onClick={() => setJobModalOpen(true)}
            /* Solid indigo with a slightly lighter border for depth */
            className="dashboard-btn bg-indigo-600! border-indigo-500! text-white! hover:bg-indigo-500! hover:border-indigo-400! shadow-sm"
          >
            <Plus size={16} />
            Add Job
          </button>
        </div>
        {/* </div> */}
        {/* <div className="w-full bg-zinc-950/60 border-y border-zinc-100/10 backdrop-blur-md py-3.5 px-8 flex gap-x-6 overflow-x-auto scrollbar-hide">
          {Array.from({ length: 20 }).map((_, index) => {
            return (
              <span
                key={index}
                className="bg-zinc-800/40 text-[12px] font-semibold px-3.5 py-1.5 rounded-md shrink-0 flex items-center gap-x-2 "
              >
                Search Filter
                <X size={12} />
              </span>
            );
          })}
        </div> */}
      </div>

      <JobPage
        jobs={jobs}
        handleModalOpen={handleModalOpen}
        deleteJob={deleteJob}
        filter={filter}
        searchQuery={search}
        handleFavoriteToggle={handlePriority}
        handleJobStatus={handleJobStatus}
        openNotesModal={openNotesModal}
      />

      <JobModal
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

const Page = () => {
  return (
    <Suspense fallback={<div>Loading Jobs...</div>}>
      <JobsContent />
    </Suspense>
  );
};

export default Page;
