import React from "react";

const SkeletonBlock = ({ className }: { className: string }) => (
  <div className={`rounded bg-slate-700/40 ${className}`} />
);

const JobCardSkeleton = () => {
  return (
    <div className="relative flex flex-col h-full font-sans group bg-slate-900/60 border border-slate-800/60 rounded-lg p-5 sm:p-6 transition-colors duration-150">
      {/* Header: status badge + actions */}
      <div className="flex items-start justify-between mb-6">
        <SkeletonBlock className="h-6 w-20 rounded-full" />

        <div className="flex items-center gap-x-1">
          <SkeletonBlock className="h-6 w-6 rounded-md" />
          <SkeletonBlock className="h-6 w-6 rounded-md" />
        </div>
      </div>

      {/* Company & Position */}
      <div className="mb-1">
        <SkeletonBlock className="h-6 w-3/4 mb-2" />
        <SkeletonBlock className="h-5 w-1/2" />
      </div>

      {/* Source link */}
      <div className="mt-3 flex items-center gap-x-2">
        <SkeletonBlock className="h-3 w-3 rounded-full" />
        <SkeletonBlock className="h-3 w-28" />
      </div>

      {/* Notes preview */}
      <div className="mt-4 mb-4 grow py-3 px-3.5 rounded-md bg-slate-800/20 border border-slate-800">
        <div className="flex items-center gap-x-2 mb-2">
          <SkeletonBlock className="h-3 w-3 rounded-full" />
          <SkeletonBlock className="h-3 w-20" />
        </div>
        <div className="space-y-2">
          <SkeletonBlock className="h-3 w-full" />
          <SkeletonBlock className="h-3 w-5/6" />
          <SkeletonBlock className="h-3 w-3/4" />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-3.5 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <SkeletonBlock className="h-3 w-20" />
        </div>
        {/* <SkeletonBlock className="h-6 w-6 rounded-md" /> */}
      </div>
    </div>
  );
};

export default JobCardSkeleton;
