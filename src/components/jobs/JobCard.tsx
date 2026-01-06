import { JobApplication } from "@/types";
import { formatDate, getStatusBadgeCss } from "@/utils";
import { ArrowDown, Calendar1, Edit, Star, Trash2 } from "lucide-react";
import React from "react";

type JobCardProps = {
  job: JobApplication;
  handleModalOpen: (data?: JobApplication) => void;
  deleteJob: (id: string) => void;
  handleFavoriteToggle: (job: JobApplication) => void;
  openNotesModal: (id: string) => void;
};

const JobCard: React.FC<JobCardProps> = ({
  job,
  handleModalOpen,
  deleteJob,
  handleFavoriteToggle,
  openNotesModal,
}) => {
  return (
    <div className="bg-slate-800 hover:translate-y-0.75 duration-400 rounded-lg h-70 p-5 overflow-hidden relative">
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-200 truncate">
          {job.companyName}
        </h2>
        <div className="flex-1 flex items-center justify-end gap-x-3">
          <p className={getStatusBadgeCss(job.status)}>{job.status} </p>
          <Star
            onClick={() => handleFavoriteToggle(job)}
            className={`${
              job.isFavourite
                ? "fill-yellow-400 stroke-yellow-500"
                : "fill-none stroke-slate-300"
            }`}
            size={20}
          />
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-300 mb-3 truncate mt-1">
        {job.position}
      </h2>

      <div className="mb-1 text-[16px] lg:text-lg text-gray-400 min-h-30">
        <h3 className="font-mono">Notes: </h3>
        <p className="font-medium font-mono line-clamp-2">
          {job.notes ? job.notes : "No Notes Yet!!"}
        </p>
        <p
          className="text-[16px] text-indigo-500 font-mono cursor-pointer"
          onClick={() => openNotesModal(job.id)}
        >
          View More...
        </p>
      </div>

      <div className="flex-1 mt-3 w-full flex gap-x-2 justify-between">
        <h3 className="text-md text-gray-200 font-medium flex gap-x-2">
          <Calendar1 size={22} /> {formatDate(job.appliedAt)}
        </h3>

        <div className="flex gap-x-3">
          <Edit
            onClick={() => {
              handleModalOpen(job);
            }}
            className="text-blue-400"
          />

          <Trash2 onClick={() => deleteJob(job.id)} className="text-red-400" />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
