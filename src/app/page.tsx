"use client";
import JobPage from "@/components/features/jobs/JobPage";
import Header from "@/components/shared/layout/Header";
import SubHeader from "@/components/shared/layout/SubHeader";
import { JobApplication, JobData, responseType } from "@/types";
import { useEffect, useState } from "react";
import NotesModal from "@/components/features/jobs/NotesModal";
import JobModal from "@/components/features/jobs/JobModal";
import { JobStatus } from "@/constants/enums";
import { createJob, getJobs, updateJob } from "@/services/jobService";
import { toast } from "sonner";

export default function Home() {
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [editData, setEditData] = useState<JobData | null>(null);
  const [jobModalOpen, setJobModalOpen] = useState<boolean>(false);
  const [notesModalOpen, setNotesModalOpen] = useState<boolean>(false);
  const [notesId, setNotesId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter, setFilter] = useState<JobStatus>(
    "" as JobApplication["status"],
  );

  const getAllJobs = async () => {
    try {
      const result = await getJobs();

      if (result.success) {
        if (result.data) {
          const cleaned = result.data.map((job: JobData) => ({
            ...job,
            appliedAt: job.appliedAt?.split("T")[0],
          }));
          setJobs(cleaned);
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  const handleModalOpen = (data?: JobData) => {
    setJobModalOpen(true);
    if (data) {
      setEditData(data);
    } else {
      setEditData(null);
    }
  };

  const handleModalClose = () => {
    setJobModalOpen(false);
    setEditData(null);
  };

  const openNotesModal = (id: number) => {
    setNotesId(id);
    setNotesModalOpen(true);
  };

  const createOrUpdateJob = async (data: JobData) => {
    if (!data) return;

    if (data.status === "draft") data.appliedAt = undefined;

    if (!editData) {
      try {
        const result: responseType = await createJob(data);

        if (result.success) {
          await getAllJobs();
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error) {}
    } else {
      if (!data.id) return;
      const result = await updateJob(data);
      if (result.success) {
        await getAllJobs();
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

  const deleteJob = (id: number) => {
    const deleteFlag = confirm("Are you sure want to delete job applications?");

    if (deleteFlag) setJobs((prev) => prev.filter((item) => item.id !== id));
  };

  const handleFavoriteToggle = (job: JobData) => {
    setJobs((prev) =>
      prev.map((item) =>
        item.id === job.id ? { ...item, priority: !item.priority } : item,
      ),
    );
  };

  // creating a copy of jobs and applying search, filter, sortby in these
  let derivedJobs = [...jobs];

  // search
  derivedJobs = derivedJobs.filter((value) => {
    const query = searchQuery.toLowerCase();

    return (
      value.companyName.toLowerCase().includes(query) ||
      value.position.toLowerCase().includes(query)
    );
  });

  // status filter
  derivedJobs = derivedJobs.filter((value) => {
    if (filter === ("" as JobApplication["status"])) return value;

    return value.status === filter;
  });

  // sortby favourite

  derivedJobs = derivedJobs.sort(
    (a, b) => Number(b.priority) - Number(a.priority),
  );

  const jobId = jobs.findIndex((item) => item.id === notesId) ?? 0;

  return (
    <div className="relative">
      <div className="sticky top-0 md:top-3 z-50">
        <Header handleModalOpen={handleModalOpen} />
        <div>
          <SubHeader
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
      </div>
      <JobPage
        jobs={derivedJobs}
        handleModalOpen={handleModalOpen}
        deleteJob={deleteJob}
        filter={filter}
        searchQuery={searchQuery}
        handleFavoriteToggle={handleFavoriteToggle}
        openNotesModal={openNotesModal}
      />
      <JobModal
        isEdit={!!editData}
        isModalOpen={jobModalOpen}
        setIsModalOpen={setJobModalOpen}
        handleModalClose={handleModalClose}
        createorUpdateJob={createOrUpdateJob}
        editData={editData}
      />
      <NotesModal
        isModalOpen={notesModalOpen}
        setIsModalOpen={setNotesModalOpen}
        notes={jobs[jobId]?.notes}
      />
    </div>
  );
}
