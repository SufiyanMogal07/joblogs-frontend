"use client";
import { Briefcase, Plus } from "lucide-react";
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
      <div className="w-full px-6 py-4 bg-zinc-800/35 border-b border-zinc-100/10 backdrop-blur-sm z-50 flex flex-col md:flex-row gap-y-4 md:items-center justify-between sticky top-0">
        <div className="flex items-center gap-4">
          <span className="p-2 md:p-3 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Briefcase size={20} />
          </span>
          <h1 className="text-lg md:text-xl font-bold tracking-wide">
            Job Applications
          </h1>
        </div>

        <div className="flex justify-center gap-x-6">
          <button
            onClick={() => setJobModalOpen(true)}
            className="flex items-center gap-1 md:gap-2 bg-indigo-600 hover:bg-indigo-600/70 text-[14px] px-2 md:px-4 py-2 rounded-lg font-semibold transition-all"
          >
            <Plus size={18} />
            Add Job
          </button>
          <button
            onClick={() => {
              setSearch("");
              router.push("/dashboard/jobs");
            }}
            className="flex items-center gap-1 md:gap-2 bg-red-500/80 hover:bg-red-500/50 text-[14px] px-2 md:px-4 py-2 rounded-lg font-semibold transition-all"
          >
            Clear Search
          </button>
        </div>
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
