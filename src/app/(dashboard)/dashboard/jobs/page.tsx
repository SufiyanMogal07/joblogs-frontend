"use client";
import { Briefcase, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useUIStore } from "@/stores/useUIStore";
import { useJobStore } from "@/stores/useJobStore";
import { JobApplication, JobData } from "@/types";
import { JobStatus } from "@/constants/enums";
import { updateJob } from "@/services/jobService";
import JobPage from "@/components/features/jobs/JobPage";
import JobModal from "@/components/features/jobs/JobModal";
import NotesModal from "@/components/features/jobs/NotesModal";

const Page = () => {
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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter, setFilter] = useState<JobStatus>(
    "" as JobApplication["status"],
  );

  const createOrUpdateJob = (data: JobData) => editData ? updateJob(editData) : createJob(data);

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
    fetchJobs();
  }, []);
  
  const jobId = jobs.findIndex((item) => item.id === notesId) ?? 0;

  return (
    <div>
      {/* Header Section */}
      <div className="w-full px-6 py-4 bg-zinc-800/35 border-b border-zinc-100/10 backdrop-blur-sm z-50 flex items-center justify-between sticky top-0">
        <div className="flex items-center gap-4">
          <span className="p-3 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Briefcase size={20} />
          </span>
          <h1 className="text-xl font-bold tracking-wide">Job Applications</h1>
        </div>

        {/* Logic-driven Button */}
        <button
          onClick={() => setJobModalOpen(true)}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2 rounded-lg font-semibold transition-all"
        >
          <Plus size={18} />
          Add Job
        </button>
      </div>

      {/* Your table or grid logic goes here */}

      <JobPage
        jobs={jobs}
        handleModalOpen={handleModalOpen}
        deleteJob={deleteJob}
        filter={filter}
        searchQuery={searchQuery}
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

export default Page;
