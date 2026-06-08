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
        <div className="flex flex-col justify-center items-center border border-dashed border-gray-700 text-gray-400 rounded-lg h-72">
          {!showNoResult ? (
            <div className="flex flex-col justify-center items-center ">
              <h3 className="text-lg font-semibold text-white">
                No job applications yet
              </h3>
              <p className="px-4 md:p-0 mt-2 mb-6 md:mb-4 text-sm text-center">
                Start tracking your job applications by adding your first one.
              </p>

              <PlusCircleIcon size={48} onClick={() => handleModalOpen()} />
              <button className="mt-3 text-md font-bold">Add Jobs</button>
            </div>
          ) : (
            <div className="flex flex-col justify-center gap-y-3 items-center">
              <BriefcaseBusiness size={33} />
              <h3 className="text-xl font-semibold">No Jobs Found</h3>
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
