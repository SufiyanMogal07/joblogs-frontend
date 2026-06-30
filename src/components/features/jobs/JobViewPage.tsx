"use client";

import React from "react";
import { JobData } from "@/types";
import { capitalizeWords, formatDate, getStatusBadgeCss } from "@/utils/utils";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit2,
  ExternalLink,
  FileText,
  Link2,
  Notebook,
  Star,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface JobViewPageProps {
  job?: JobData | null;
  onEdit?: (job: JobData) => void;
  onDelete?: (id: number) => void;
}

const JobViewPage: React.FC<JobViewPageProps> = ({ job, onEdit, onDelete }) => {
  const router = useRouter();

  if (!job) {
    return (
      <div className="w-full min-h-screen bg-slate-900 p-6 animate-pulse">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="h-8 w-24 bg-slate-800 rounded-md" />
          <div className="h-20 w-full bg-slate-800 rounded-2xl" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 w-full bg-slate-800 rounded-2xl" />
            </div>
            <div className="h-96 w-full bg-slate-800 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation & Action Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/60">
          <button
            onClick={() => router.push("/dashboard/jobs")}
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-all cursor-pointer group"
          >
            <div className="p-1.5 rounded-md bg-slate-800/50 group-hover:bg-slate-700 transition-colors">
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            Back to Applications
          </button>

          <div className="flex items-center gap-3">
            {onEdit && (
              <button
                onClick={() => onEdit(job)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 rounded-lg text-indigo-300 hover:text-indigo-200 transition-all cursor-pointer"
              >
                <Edit2 size={15} />
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(job.id)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 rounded-lg text-red-400 hover:text-red-300 transition-all cursor-pointer"
              >
                <Trash2 size={15} />
                Delete
              </button>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
            <span className={getStatusBadgeCss(job.status)}>{job.status}</span>
            {job.priority && (
              <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                <Star size={12} className="fill-amber-400 stroke-amber-400" />
                Priority
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-2">
            {job.position}
          </h1>
          <p className="text-xl font-medium text-slate-400">
            at <span className="text-slate-200 font-semibold">{job.companyName}</span>
          </p>
        </div>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Job Description Card */}
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                  <FileText size={20} className="text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-100 tracking-wide">
                  Job Description
                </h3>
              </div>
              
              {job.jobDescription ? (
                <div className="text-slate-300 text-base leading-relaxed whitespace-pre-wrap font-light">
                  {job.jobDescription}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 px-4 border-2 border-dashed border-slate-700/50 rounded-xl bg-slate-800/20">
                  <p className="text-slate-400 text-sm mb-3">No description provided.</p>
                  {onEdit && (
                    <button onClick={() => onEdit(job)} className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                      + Add job description
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Notes Card */}
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <Notebook size={20} className="text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-100 tracking-wide">
                  My Notes
                </h3>
              </div>
              
              {job.notes ? (
                <div className="text-slate-300 text-base leading-relaxed whitespace-pre-wrap font-light">
                  {job.notes}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 px-4 border-2 border-dashed border-slate-700/50 rounded-xl bg-slate-800/20">
                  <p className="text-slate-400 text-sm mb-3">No preparation notes yet.</p>
                  {onEdit && (
                    <button onClick={() => onEdit(job)} className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                      + Add notes
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
                Application Details
              </h3>

              <div className="space-y-6">
                {/* Source */}
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1.5">Source</p>
                  <p className="text-base font-medium text-slate-200">
                    {job.source ? capitalizeWords(job.source) : <span className="text-slate-500 italic text-sm">Not specified</span>}
                  </p>
                </div>

                {/* Job URL */}
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1.5">Job Link</p>
                  {job.jobUrl ? (
                    <Link
                      href={job.jobUrl}
                      target="_blank"
                      className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-2 rounded-lg transition-colors border border-indigo-500/10"
                    >
                      <Link2 size={16} />
                      Open Listing
                      <ExternalLink size={14} className="ml-1 opacity-70" />
                    </Link>
                  ) : (
                    <span className="text-slate-500 italic text-sm">No URL provided</span>
                  )}
                </div>

                {/* Applied Date */}
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1.5">Applied Date</p>
                  <div className="flex items-center gap-2 text-base font-medium text-slate-200">
                    <Calendar size={16} className="text-slate-400" />
                    <span>{formatDate(job.appliedAt)}</span>
                  </div>
                </div>
              </div>

              {/* Meta Timestamps */}
              <div className="mt-8 pt-6 border-t border-slate-700/50 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5"><Clock size={14} /> Added</span>
                  <span>{job.createdAt ? new Date(job.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "N/A"}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5"><Clock size={14} /> Updated</span>
                  <span>{job.updatedAt ? new Date(job.updatedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "N/A"}</span>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobViewPage;