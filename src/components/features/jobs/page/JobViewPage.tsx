"use client";

import React from "react";
import { getStatusBadgeCss } from "@/utils/utils";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  Edit2,
  ExternalLink,
  FileText,
  Layers3,
  Star,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { JobData } from "@/types/job.type";
import { userIdType } from "@/types/auth.type";

interface JobViewPageProps {
  job?: JobData | null;
  onEdit?: (job: JobData) => void;
  onDelete?: (id: userIdType) => void;
}

const JobViewPage: React.FC<JobViewPageProps> = ({ job, onEdit, onDelete }) => {
  const router = useRouter();

  if (!job) {
    return (
      <div className="w-full h-full min-h-screen text-slate-100 p-4 md:p-5 animate-pulse">
        <div className="max-w-6xl pb-8 mx-auto">
          <div className="flex flex-wrap gap-5 items-center justify-between mb-8 pb-4 border-b border-slate-800">
            <div className="h-9 w-48 bg-slate-800 rounded-md" />
            <div className="flex items-center gap-3">
              <div className="h-9 w-20 bg-slate-800 rounded-lg" />
              <div className="h-9 w-24 bg-slate-800 rounded-lg" />
            </div>
          </div>

          <div className="pb-5 mb-8 border-b border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-7 w-24 bg-slate-800 rounded-full" />
              <div className="h-7 w-24 bg-slate-800 rounded-full" />
            </div>
            <div className="h-11 w-3/4 max-w-xl bg-slate-800 rounded-md mb-3" />
            <div className="h-7 w-64 bg-slate-800 rounded-md" />
            <div className="h-5 w-44 bg-slate-800 rounded-md mt-4" />
          </div>

          <div className="mb-10">
            <div className="mb-5">
              <div className="h-7 w-44 bg-slate-800 rounded-md" />
              <div className="h-4 w-52 bg-slate-800 rounded-md mt-2" />
            </div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-slate-800 rounded-md" />
              <div className="h-4 w-11/12 bg-slate-800 rounded-md" />
              <div className="h-4 w-4/5 bg-slate-800 rounded-md" />
              <div className="h-4 w-2/3 bg-slate-800 rounded-md" />
            </div>
          </div>

          <aside className="mb-10">
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-800">
                <div className="h-6 w-32 bg-slate-800 rounded-md" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-slate-800 md:divide-y-0">
                <div className="px-5 py-4 space-y-2">
                  <div className="h-3 w-16 bg-slate-800 rounded" />
                  <div className="h-6 w-24 bg-slate-800 rounded-full" />
                </div>
                <div className="px-5 py-4 space-y-2">
                  <div className="h-3 w-14 bg-slate-800 rounded" />
                  <div className="h-5 w-28 bg-slate-800 rounded" />
                </div>
                <div className="px-5 py-4 space-y-2">
                  <div className="h-3 w-24 bg-slate-800 rounded" />
                  <div className="h-5 w-28 bg-slate-800 rounded" />
                </div>
                <div className="px-5 py-4 space-y-2">
                  <div className="h-3 w-16 bg-slate-800 rounded" />
                  <div className="h-5 w-24 bg-slate-800 rounded" />
                </div>
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-5">
              <div className="h-7 w-28 bg-slate-800 rounded-md" />
              <div className="h-4 w-48 bg-slate-800 rounded-md mt-2" />
            </div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-slate-800 rounded-md" />
              <div className="h-4 w-3/4 bg-slate-800 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full text-slate-100 font-sans p-4 md:p-5">
      <div className="max-w-6xl pb-8 mx-auto relative">
        <div className="flex flex-wrap gap-5 items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <button
            onClick={() => router.push("/dashboard/jobs")}
            className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-all cursor-pointer group"
          >
            <div className="p-1.5 rounded-md bg-slate-800/50 group-hover:bg-slate-700 transition-colors">
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
            </div>
            Back to Applications
          </button>

          <div className="flex items-center gap-3">
            {onEdit && (
              <button
                onClick={() => onEdit(job)}
                className="flex items-center gap-2 px-3 md:px-4 py-2 text-sm font-medium bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 rounded-lg text-indigo-300 hover:text-indigo-200 transition-all cursor-pointer"
              >
                <Edit2 size={15} />
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(job.id)}
                className="flex items-center gap-2 px-3 md:px-4 py-2 text-sm font-medium bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 rounded-lg text-red-400 hover:text-red-300 transition-all cursor-pointer"
              >
                <Trash2 size={15} />
                Delete
              </button>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <div className="pb-5 mb-8 border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
            <span className={getStatusBadgeCss(job.status)}>{job.status}</span>
            {job.priority && (
              <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                <Star size={12} className="fill-amber-400 stroke-amber-400" />
                Priority
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight mb-2">
            {job.position}
          </h1>

          <p className="text-xl font-medium text-slate-400">
            at{" "}
            <span className="text-slate-200 font-semibold">
              {job.companyName}
            </span>
          </p>
          {job.jobUrl && (
            <a
              href={job.jobUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex max-w-full items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ExternalLink size={15} />
              <span className="truncate">View original posting</span>
            </a>
          )}
        </div>

        <div className="mb-10">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-white">
              Job Description
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Details about this position
            </p>
          </div>

          <div className="text-[15px] leading-7 text-slate-300">
            {job.jobDescription || (
              <span className="text-slate-500 italic">
                No job description added.
              </span>
            )}
          </div>
        </div>

        <aside className="lg:border-slate-800 mb-10">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-800">
              <h2 className="text-lg font-semibold text-white">Job Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-slate-800 md:divide-y-0">
              {/* Status */}
              <div className="px-5 py-4">
                <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">
                  <Layers3 size={13} />
                  Status
                </p>
                <div>
                  <span className={`${getStatusBadgeCss(job.status)} w-fit`}>
                    {job.status}
                  </span>
                </div>
              </div>

              {/* Source */}
              <div className="px-5 py-4">
                <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500 mb-1">
                  <BriefcaseBusiness size={13} />
                  Source
                </p>
                <p className="text-sm font-medium text-slate-200 capitalize">
                  {job.source?.replace("_", " ") || "Not specified"}
                </p>
              </div>

              {/* Date Applied */}
              <div className="px-5 py-4">
                <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500 mb-1">
                  <CalendarDays size={13} />
                  Applied On
                </p>
                <p className="text-sm font-medium text-slate-200">
                  {job.appliedAt
                    ? job.appliedAt.split("T")[0]
                    : "Not specified"}
                </p>
              </div>

              {/* Priority */}
              <div className="px-5 py-4">
                <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">
                  <Star size={13} />
                  Priority
                </p>

                {job.priority ? (
                  <div className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-400">
                    <Star
                      size={14}
                      className="fill-amber-400 stroke-amber-400"
                    />
                    Top Choice
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">Normal</p>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* <section className="mb-10">
          <div className="mb-5">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
              <FileText size={19} className="text-slate-400" />
              Resume
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Resume used for this application
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-dashed border-slate-700 bg-slate-900/30 px-5 py-6 text-sm text-slate-500">
            <FileText size={18} />
            <span>No resume attached yet.</span>
          </div>
        </section> */}

        <div className="">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-white">Job Notes</h2>
            <p className="text-sm text-slate-500 mt-1">
              Notes about this position
            </p>
          </div>

          <div className="text-[15px] leading-7 text-slate-300">
            {job.notes || (
              <span className="text-slate-500 italic">No Notes added.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobViewPage;
