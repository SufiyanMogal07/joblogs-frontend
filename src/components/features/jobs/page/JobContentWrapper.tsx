"use client";
import { useSearchParams } from "next/navigation";
import JobContent from "./JobContent";
import { Suspense } from "react";

const JobContentInner = () => {
  const searchParam = useSearchParams();
  const query = searchParam.toString();

  return <JobContent query={query} />;
};

const JobContentWrapper = () => {
  return (
    <Suspense fallback={null}>
      <JobContentInner />
    </Suspense>
  );
};

export default JobContentWrapper;
