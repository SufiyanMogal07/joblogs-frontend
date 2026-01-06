"use client";
import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { JobApplication } from "@/types";
import { Briefcase, BriefcaseBusiness, PlusCircleIcon } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import JobCardSkeleton from "./JobCardSkeleton";

type JobPageProps = {
  jobs: JobApplication[];
  handleModalOpen: (data?: JobApplication) => void;
  deleteJob: (id: string) => void;
  filter: string;
  searchQuery: string;
  handleFavoriteToggle: (job: JobApplication) => void;
  openNotesModal: (id: string) => void;
};

const JobPage: React.FC<JobPageProps> = ({
  jobs,
  handleModalOpen,
  deleteJob,
  filter,
  searchQuery,
  handleFavoriteToggle,
  openNotesModal
}) => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const hasActiveFilter = searchQuery || filter;
  const showNoResult = hasActiveFilter;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="mt-4">
      {(jobs.length === 0  && !loading)&& (
        <div className="flex flex-col justify-center items-center border border-dashed border-gray-700 text-gray-400 rounded-lg h-72">
          {!showNoResult ? (
            <div className="flex flex-col justify-center items-center ">
              <h3 className="text-lg font-semibold text-white">
                No job applications yet
              </h3>
              <p className="mt-2 mb-4 text-sm">
                Start tracking your job applications by adding your first one.
              </p>

              <PlusCircleIcon size={54} onClick={() => handleModalOpen()} />
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

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4 md:p-0">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => {
              return <JobCardSkeleton key={i} />;
            })
          : jobs.map((job: JobApplication) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  handleModalOpen={handleModalOpen}
                  deleteJob={deleteJob}
                  handleFavoriteToggle={handleFavoriteToggle}
                  openNotesModal={openNotesModal}
                />
              );
            })}
      </div>
    </div>
  );
};

export default JobPage;
