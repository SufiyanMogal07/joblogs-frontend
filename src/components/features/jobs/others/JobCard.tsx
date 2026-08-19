"use client";
import Popup from "@/components/ui/Popup";
import { editableJobStatus, JobStatus } from "@/constants/enums";
import { userIdType } from "@/types/auth.type";
import { JobData } from "@/types/job.type";
import { capitalizeSentence, capitalizeWords, formatDate, getStatusBadgeCss } from "@/utils/utils";
import {
  ArrowBigDown,
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
  deleteJob: (id: userIdType) => void;
  handleFavoriteToggle: (job: JobData) => void;
  handleJobStatus: (job: JobData, status: JobStatus) => void;
  openNotesModal: (id: userIdType) => void;
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
      className={`relative flex flex-col h-full font-sans group bg-card border border-border/60 rounded-lg p-5 sm:p-6 transition-colors duration-150 ${
        isPopupOpen ? "z-50" : "z-0"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6 relative">

        <p className={getStatusBadgeCss(job.status)}>{job.status}</p>

        <div className="flex items-center gap-x-1 -mr-1.5 -mt-1">
          <button
            type="button"
            onClick={() => handleFavoriteToggle(job)}
            aria-label={job.priority ? "Remove priority" : "Mark as priority"}
            className="p-1.5 rounded-md hover:bg-slate-800 transition-colors"
          >
            <Star
              className={`transition-colors duration-150 ${
                job.priority
                  ? "fill-amber-400/90 stroke-amber-400/90"
                  : "fill-none stroke-slate-500 hover:stroke-slate-300"
              }`}
              size={16}
            />
          </button>
          <button
            type="button"
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            aria-label="More options"
            className="px-[0.1px] rounded-md hover:bg-slate-800 transition-colors"
          >
            <EllipsisVertical
              ref={toggleRef}
              size={18}
              className="text-slate-500 group-hover:text-slate-400"
            />
          </button>
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
                  ? "fill-amber-400 stroke-amber-400"
                  : "fill-none stroke-slate-400"
              }`}
              size={15}
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
            <Edit size={15} className="text-slate-400" />
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
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500 inline-block" />
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
            <Trash2 size={15} />
            Delete job
          </button>
        </Popup>
      </div>

      {/* Company & Position */}
      <h2 className="text-lg md:text-xl font-semibold text-slate-100 tracking-tight truncate leading-tight">
        {job.companyName}
      </h2>
      <h3 className="text-md text-slate-400 truncate mt-0.5">
        {job.position}
      </h3>

      {/* Source */}
      <div className="mt-3">
        <Link
          target={job.jobUrl ? "_blank" : "_self"}
          href={job.jobUrl || "/dashboard/jobs"}
          className="inline-flex items-center gap-x-1.5 text-xs text-slate-400 hover:text-slate-300 transition-colors"
        >
          <ExternalLink size={12} />
          <span>{capitalizeSentence(job.source.split("_"))}</span>
        </Link>
      </div>

      {/* Notes */}
      <div
        className="mt-4 mb-4 grow cursor-pointer py-3 px-3.5 rounded-md bg-slate-800/30 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 transition-colors duration-150"
        onClick={() => openNotesModal(job.id)}
      >
        <div className="flex items-center gap-x-1.5 mb-1.5">
          <Notebook size={12} className="text-slate-500" />
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
            Notes
          </span>
        </div>
        <p className="text-sm text-slate-300 line-clamp-1">
          {job.notes ? job.notes : <span className="text-slate-500">No notes yet</span>}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-3.5 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-x-1.5 text-slate-500">
          <Calendar1 size={14} />
          <span className="text-xs font-medium">
            {formatDate(job.appliedAt)}
          </span>
        </div>

        {/* <Link
          className="text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors relative"
          href={`/dashboard/jobs/${job.id}`}
        >
          View details
          {missingFields && (
            <span
              className="absolute -top-0.5 -right-2 w-1.5 h-1.5 rounded-full bg-amber-400"
              title="Some fields are incomplete"
            />
          )}
        </Link> */}
      </div>
    </div>
  );
};

export default JobCard;