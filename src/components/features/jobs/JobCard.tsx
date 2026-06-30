"use client";
import Popup from "@/components/ui/Popup";
import { editableJobStatus, JobStatus } from "@/constants/enums";
import { updateJob } from "@/services/jobService";
import { JobData } from "@/types";
import { capitalizeWords, formatDate, getStatusBadgeCss } from "@/utils/utils";
import {
  Calendar1,
  Edit,
  EllipsisVertical,
  ExternalLink,
  Notebook,
  Star,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React, { useCallback, useMemo, useRef, useState } from "react";

type JobCardProps = {
  job: JobData;
  handleModalOpen: (data?: JobData) => void;
  deleteJob: (id: number) => void;
  handleFavoriteToggle: (job: JobData) => void;
  handleJobStatus: (job: JobData, status: JobStatus) => void;
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
      className={`relative flex flex-col h-full font-sans group bg-slate-900 border-slate-700/60 border rounded-xl p-5 sm:p-6 transition-all duration-200 hover:border-slate-500 hover:shadow-lg hover:-translate-y-0.5 ${
        isPopupOpen ? "z-50" : "z-0"
      }`}
    >
      <div className="flex items-center justify-between mb-4 relative">
        <p className={getStatusBadgeCss(job.status)}>{job.status}</p>

        <div className="flex gap-x-3">
          <div className="flex items-center gap-x-2">
            <Star
              onClick={() => handleFavoriteToggle(job)}
              className={`cursor-pointer transition-colors duration-200 ${
                job.priority
                  ? "fill-yellow-400 stroke-yellow-500"
                  : "fill-none stroke-slate-400 hover:stroke-yellow-400"
              }`}
              size={18}
            />
          </div>
          <EllipsisVertical
            ref={toggleRef}
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            size={24}
            className="text-slate-400 hover:text-slate-200 cursor-pointer px-0.5 py-1 rounded-md hover:bg-slate-800 transition-colors"
          />
        </div>

        <Popup isOpen={isPopupOpen} onClose={closePopup} anchorRef={toggleRef}>
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
                handleJobStatus(job, status);
                closePopup();
              }}
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
      <h2 className="text-xl md:text-2xl font-bold text-slate-100 tracking-tight truncate leading-tight mt-1">
        {job.companyName}
      </h2>
      <h3 className="text-[15px] md:text-base font-medium text-slate-400 truncate mt-1">
        {job.position}
      </h3>

      {/* Source - Styled as a clean pill badge */}
      <div className="mt-3">
        <Link
          target={job.jobUrl ? "_blank" : "_self"}
          href={job.jobUrl || "/dashboard/jobs"}
          className="inline-flex items-center gap-x-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700/60 hover:bg-slate-700/80 transition-colors cursor-pointer w-fit"
        >
          <ExternalLink size={14} className="text-slate-400" />
          <span className="text-xs font-medium text-slate-300">
            {capitalizeWords(job.source)}
          </span>
        </Link>
      </div>

      {/* Notes */}
      <div
        className="my-5 flex-grow cursor-pointer group/notes py-3.5 px-4 rounded-lg bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 transition-all duration-200"
        onClick={() => openNotesModal(job.id)}
      >
        <div className="flex items-center gap-x-2 mb-2">
          <Notebook size={14} className="text-slate-400" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Notes
          </span>
        </div>
        <p className="text-[14px] text-slate-300 line-clamp-1 leading-relaxed">
          {job.notes ? job.notes : <span className="italic text-slate-500">No notes yet...</span>}
        </p>
        <span className="text-[13px] text-slate-500 group-hover/notes:text-slate-300 font-medium mt-2 inline-flex items-center transition-colors">
          Review Notes <span className="ml-1 opacity-0 group-hover/notes:opacity-100 group-hover/notes:translate-x-1 transition-all">→</span>
        </span>
      </div>

      {/* Footer: date + actions */}
      <div className="mt-auto pt-4 border-t border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center gap-x-2 text-slate-400">
          <Calendar1 size={16} />
          <span className="text-[13px] sm:text-sm font-medium">
            {formatDate(job.appliedAt)}
          </span>
        </div>

        <button
          className="text-[13px] sm:text-[14px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors relative group/btn"
          onClick={() => handleModalOpen(job)}
        >
          View More
          {(!job.jobUrl || !job.jobDescription || !job.source) && (
            <span
              className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-amber-400 animate-pulse"
              title="Some fields are incomplete"
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default JobCard;