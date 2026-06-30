"use client";

import React, { use, useEffect, useState } from "react";
import { useJobStore } from "@/stores/useJobStore";
import JobViewPage from "@/components/features/jobs/JobViewPage";
import JobModal from "@/components/features/jobs/JobModal";
import { deleteJob as deleteJobApi } from "@/services/jobService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type PageProps = {
  params: Promise<{ id: string }>;
};

const Page = ({ params }: PageProps) => {
  const { id } = use(params);
  const router = useRouter();
  const { jobs, fetchJobs, updateJob } = useJobStore();
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const jobId = Number(id);
  const job = jobs.find((j) => j.id === jobId);

  useEffect(() => {
    const loadData = async () => {
      if (jobs.length === 0) {
        await fetchJobs();
      }
      setLoading(false);
    };
    loadData();
  }, [jobs.length, fetchJobs]);

  const handleEdit = () => {
    setJobModalOpen(true);
  };

  const handleDelete = async (targetId: number) => {
    const deleteFlag = confirm("Are you sure want to delete job application?");
    if (deleteFlag) {
      try {
        const result = await deleteJobApi(targetId);
        if (result.success) {
          toast.success(result.message);
          // Refresh store cache
          await fetchJobs();
          router.push("/dashboard/jobs");
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Failed to delete job application");
      }
    }
  };

  if (loading) {
    return <JobViewPage job={null} />;
  }

  if (!job) {
    return (
      <div className="w-full h-[80vh] bg-slate-900 flex flex-col justify-center items-center p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Job Application Not Found</h2>
        <p className="text-slate-400 mb-6">
          The job application you are trying to view does not exist or has been deleted.
        </p>
        <button
          onClick={() => router.push("/dashboard/jobs")}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-colors cursor-pointer"
        >
          Back to Applications
        </button>
      </div>
    );
  }

  return (
    <>
      <JobViewPage job={job} onEdit={handleEdit} onDelete={handleDelete} />

      <JobModal
        key={job.id}
        isEdit={true}
        isModalOpen={jobModalOpen}
        setIsModalOpen={setJobModalOpen}
        handleModalClose={() => setJobModalOpen(false)}
        createorUpdateJob={(data) => updateJob(data)}
        editData={job}
      />
    </>
  );
};

export default Page;
