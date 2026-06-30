"use client";
import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { JobData } from "@/types";
import { BriefcaseBusiness, PlusCircleIcon } from "lucide-react";
import JobCardSkeleton from "@/components/ui/JobCardSkeleton";
import { JobStatus } from "@/constants/enums";

type JobPageProps = {
  jobs: JobData[];
  handleModalOpen: (data?: JobData) => void;
  deleteJob: (id: number) => void;
  filter: string;
  searchQuery: string;
  handleFavoriteToggle: (job: JobData) => void;
  handleJobStatus: (job: JobData, status: JobStatus) => void;
  openNotesModal: (id: number) => void;
};

const JobPage: React.FC<JobPageProps> = ({
  jobs,
  handleModalOpen,
  deleteJob,
  filter,
  searchQuery,
  handleFavoriteToggle,
  handleJobStatus,
  openNotesModal,
}) => {
  const [loading, setLoading] = useState(true);

  const hasActiveFilter = searchQuery || filter;
  const showNoResult = hasActiveFilter;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="mx-2 mt-4">
      {jobs.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center w-full h-72 px-4 border-2 border-dashed border-slate-700/50 rounded-2xl bg-slate-800/20 text-center animate-in fade-in duration-300">

          {!showNoResult ? (
            /* State 1: Absolutely no jobs in the database yet */
            <div className="flex flex-col items-center max-w-sm">
              <div className="p-4 bg-slate-800/50 rounded-full mb-4 ring-1 ring-slate-700/50">
                <BriefcaseBusiness className="w-8 h-8 text-slate-400" strokeWidth={1.5} />
              </div>

              <h3 className="text-xl font-bold text-slate-100 mb-2">
                No applications yet
              </h3>

              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Start tracking your job hunt. Add your first application to keep everything organized.
              </p>

              {/* Combined Icon and Text into a single, polished button */}
              <button
                onClick={() => handleModalOpen()}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 hover:text-indigo-200 text-sm font-semibold rounded-lg transition-all cursor-pointer group"
              >
                <PlusCircleIcon size={18} className="group-hover:scale-110 transition-transform" />
                <span>Add Your First Job</span>
              </button>
            </div>
          ) : (
            /* State 2: User searched/filtered, but found nothing */
            <div className="flex flex-col items-center max-w-sm">
              <div className="p-4 bg-slate-800/50 rounded-full mb-4 ring-1 ring-slate-700/50">
                <BriefcaseBusiness className="w-8 h-8 text-slate-500 opacity-50" strokeWidth={1.5} />
                {/* Alternatively, use <SearchX size={32} /> here if you have it imported */}
              </div>

              <h3 className="text-xl font-bold text-slate-100 mb-2">
                No matching jobs found
              </h3>

              <p className="text-sm text-slate-400">
                We couldn't find any applications matching your current filters. Try adjusting your search.
              </p>
            </div>
          )}

        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 p-2 md:p-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => {
            return <JobCardSkeleton key={i} />;
          })
          : jobs.map((job: JobData) => {
            return (
              <JobCard
                key={job.id}
                job={job}
                handleModalOpen={handleModalOpen}
                deleteJob={deleteJob}
                handleFavoriteToggle={handleFavoriteToggle}
                handleJobStatus={handleJobStatus}
                openNotesModal={openNotesModal}
              />
            );
          })}
      </div>
    </div>
  );
};

export default JobPage;
