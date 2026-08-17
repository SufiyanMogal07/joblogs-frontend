"use client";

import React from "react";
import { JobData, userIdType } from "@/types";
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
  onDelete?: (id: userIdType) => void;
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
    <div className="w-full h-full text-slate-100 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        
        <div className="flex flex-wrap gap-5 items-center justify-between mb-8 pb-4 border-b border-slate-800/60">  
          <button
            onClick={() => router.push("/dashboard/jobs")}
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-all cursor-pointer group"
          >
            <div className="p-1.5 rounded-md bg-slate-800/50 group-hover:bg-slate-700 transition-colors">
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            Back to Applications
          </button>

          {/* <div className="flex items-center gap-3">
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
          </div> */}
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

          <h1 className="text-4xl font-extrabold tracking-tight text-white leading-tight mb-2">
            {job.position}
          </h1>
          <p className="text-xl font-medium text-slate-400">
            at <span className="text-slate-200 font-semibold">{job.companyName}</span>
          </p>
        </div>

        {/* Two-Column Responsive Layout */}
      
      </div>
    </div>
  );
};

export default JobViewPage;