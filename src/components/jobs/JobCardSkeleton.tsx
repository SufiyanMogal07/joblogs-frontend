import React from "react";

const SkeletonBlock = ({ className }: { className: string }) => (
  <div className={`rounded animate-shimmer ${className}`} />
);

const JobCardSkeleton = () => {
  return (
    <div className="bg-slate-800 rounded-lg h-70 p-5 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <SkeletonBlock className="h-6 w-1/2" />
        <div className="flex items-center gap-x-3">
          <SkeletonBlock className="h-5 w-20 rounded-full" />
          <SkeletonBlock className="h-5 w-5 rounded-full" />
        </div>
      </div>

      {/* Position */}
      <SkeletonBlock className="h-5 w-2/3 mt-3" />

      {/* Notes */}
      <div className="mt-4 space-y-2">
        <SkeletonBlock className="h-4 w-24" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-5/6" />
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-5">
        <SkeletonBlock className="h-5 w-40" />
        <div className="flex gap-x-3">
          <SkeletonBlock className="h-5 w-5" />
          <SkeletonBlock className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default JobCardSkeleton;
