import React from "react";

const SkeletonBlock = ({ className }: { className: string }) => (
  <div className={`rounded animate-shimmer ${className}`} />
);

const JobCardSkeleton = () => {
  return (
    <div className="bg-slate-800/90 border border-gray-600/40 rounded-xl p-6 h-[320px] overflow-hidden animate-pulse">
      {/* Header: Badge & Ellipsis */}
      <div className="flex items-center justify-between mb-4">
        <SkeletonBlock className="h-6 w-20 rounded-full" /> {/* Badge */}
        <SkeletonBlock className="h-6 w-6 rounded-md" /> {/* Ellipsis */}
      </div>
      {/* Company & Position */}
      <SkeletonBlock className="h-7 w-3/4 mb-2" /> {/* Company Name */}
      <SkeletonBlock className="h-5 w-1/2" /> {/* Position */}
      {/* Source */}
      <div className="flex items-center gap-x-2 mt-4">
        <SkeletonBlock className="h-4 w-4 rounded-full" />
        <SkeletonBlock className="h-4 w-24" />
      </div>
      {/* Divider */}
      <div className="border-t border-gray-700/50 my-4" />
      {/* Notes preview skeleton */}
      <div className="space-y-2 mb-6">
        <SkeletonBlock className="h-4 w-16" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-5/6" />
      </div>
      {/* Footer: Date + Star Icon */}
      <div className="flex items-center justify-between mt-auto">
        <SkeletonBlock className="h-5 w-28" />
        <SkeletonBlock className="h-6 w-6 rounded-md" />
      </div>
    </div>
  );
};

export default JobCardSkeleton;
