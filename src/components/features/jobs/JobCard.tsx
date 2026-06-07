"use client";
import Popup from "@/components/ui/Popup";
import { editableJobStatus, JobStatus } from "@/constants/enums";
import { JobData } from "@/types";
import { capitalizeWords, formatDate, getStatusBadgeCss, getStatusBorderColor } from "@/utils/utils";
import {
  Calendar1,
  CircleEllipsisIcon,
  Edit,
  EllipsisVertical,
  EllipsisVerticalIcon,
  ExternalLink,
  LucideEllipsisVertical,
  Notebook,
  Star,
  Trash2,
} from "lucide-react";
import React, { useCallback, useMemo, useRef, useState } from "react";

type JobCardProps = {
  job: JobData;
  handleModalOpen: (data?: JobData) => void;
  deleteJob: (id: number) => void;
  handleFavoriteToggle: (job: JobData) => void;
  handleJobStatus: (job:JobData,status: JobStatus) => void;
  openNotesModal: (id: number) => void;
};

const JobCard: React.FC<JobCardProps> = ({
  job,
  handleModalOpen,
  deleteJob,
  handleFavoriteToggle,
  handleJobStatus,
  openNotesModal,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const toggleRef = useRef<SVGSVGElement>(null);

  const filteredStatuses = useMemo(() => {
    return editableJobStatus.filter((status) => status !== job.status);
  }, [job.status]);

  const closePopup = useCallback(() => setIsPopupOpen(false), []);

  return (
    <div
      className={`group bg-[#1E293B]/50 backdrop-blur-sm border-slate-800 border-2 rounded-lg p-5 transition-all duration-300 hover:shadow-lg ${isPopupOpen ? "z-50" : "z-0"}`}
    >
      <div className="flex items-center justify-between mb-4 relative">
        <p className={getStatusBadgeCss(job.status)}>{job.status}</p>

        <EllipsisVertical
          ref={toggleRef}
          onClick={() => setIsPopupOpen(!isPopupOpen)}
          size={26}
          className="text-gray-300 hover:text-white cursor-pointer px-0.5 py-1 rounded-md hover:bg-slate-700/50 transition-colors"
        />

        <Popup isOpen={isPopupOpen} onClose={closePopup} anchorRef={toggleRef} >
           <button
              onClick={() => {
                handleFavoriteToggle(job);
                closePopup();
              }}
              className="flex items-center gap-x-3"
            >
              <Star
                className={`${
                  job.priority
                    ? "fill-yellow-400 stroke-yellow-500"
                    : "fill-none stroke-gray-400"
                }`}
                size={16}
              />
              {job.priority ? "Remove priority" : "Mark as priority"}
            </button>

            <button
              onClick={() => {
                handleModalOpen(job);
                closePopup();
              }}
              className="flex items-center gap-x-3"
            >
              <Edit size={16} className="text-blue-400" />
              Edit job
            </button>

            {filteredStatuses.map((status) => (
              <button
                key={status}
                onClick={() => {
                  handleJobStatus(job,status);
                  closePopup();
                }
                 }
                className="flex items-center gap-x-3"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block" />
                Mark as {status}
              </button>
            ))}

            <button
              onClick={() => {
                deleteJob(job.id);
                closePopup();
              }}
              className="flex items-center gap-x-3 text-red-400! hover:text-red-300!"
            >
              <Trash2 size={16} />
              Delete job
            </button>
        </Popup>
      </div>

      {/* Company & Position */}
      <h2 className="text-xl md:text-2xl font-bold text-white truncate leading-tight">
        {job.companyName}
      </h2>
      <h3 className="text-base md:text-lg font-semibold text-gray-300 truncate mt-1">
        {job.position}
      </h3>

      {/* Source */}
      <div className="flex items-center gap-x-2 mt-3 cursor-pointer">
        <ExternalLink size={16} className="text-gray-400" />
        <span className="text-sm font-medium text-gray-400">
          {capitalizeWords(job.source)}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-600/40 my-4" />

      {/* Notes preview */}
      <div
        className="mb-5 cursor-pointer group/notes"
        onClick={() => openNotesModal(job.id)}
      >
        <div className="flex items-center gap-x-2 mb-1.5">
          <Notebook size={16} className="text-gray-400" />
          <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
            Notes
          </span>
        </div>
        <p className="text-[15px] text-gray-300 line-clamp-1 leading-relaxed">
          {job.notes ? job.notes : "No notes yet..."}
        </p>
        <span className="text-sm text-indigo-400 group-hover/notes:text-indigo-300 font-medium mt-1.5 inline-block transition-colors">
          View more →
        </span>
      </div>

      {/* Footer: date + actions */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-x-2 text-gray-400">
          <Calendar1 size={18} />
          <span className="text-sm font-medium">
            {formatDate(job.appliedAt)}
          </span>
        </div>

        <div className="flex items-center gap-x-2">
          <Star
            onClick={() => handleFavoriteToggle(job)}
            className={`cursor-pointer transition-colors duration-200 ${
              job.priority
                ? "fill-yellow-400 stroke-yellow-500"
                : "fill-none stroke-gray-400 hover:stroke-yellow-400"
            }`}
            size={18}
          />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
