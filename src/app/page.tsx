"use client";
import JobModal from "@/components/form/JobModal";
import JobPage from "@/components/jobs/JobPage";
import NotesModal from "@/components/NotesModal";
import useLocalStorage from "@/hooks/useLocalStorage";
import Header from "@/layout/Header";
import SubHeader from "@/layout/SubHeader";
import { JobApplication, JobStatus } from "@/types";
import { useState } from "react";

export default function Home() {
  const [jobs, setJobs] = useLocalStorage<JobApplication[]>("jobs", []);
  const [editData, setEditData] = useState<JobApplication | null>(null);
  const [jobModalOpen, setJobModalOpen] = useState<boolean>(false);
  const [notesModalOpen, setNotesModalOpen] = useState<boolean>(false);
  const [notesId, setNotesId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter, setFilter] = useState<JobStatus | "">("");

  const handleModalOpen = (data?: JobApplication) => {
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

  const openNotesModal = (id: string) => {
    setNotesId(id);
    setNotesModalOpen(true);
  };

  const createOrUpdateJob = (data: JobApplication) => {
    if (!data) return;

    if (data.status === "draft") data.appliedAt = "";
    const newJobs = [...jobs];

    if (!editData) {
      newJobs.push(data);
      setJobs(newJobs);
    } else {
      if (!data.id) return;
      setJobs((prev) =>
        prev.map((item) => (item.id === data.id ? { ...item, ...data } : item))
      );
    }
  };

  const deleteJob = (id: string) => {
    const deleteFlag = confirm("Are you sure want to delete job applications?");

    if (deleteFlag) setJobs((prev) => prev.filter((item) => item.id !== id));
  };

  const handleFavoriteToggle = (job: JobApplication) => {
    setJobs((prev) =>
      prev.map((item) =>
        item.id === job.id ? { ...item, isFavourite: !item.isFavourite } : item
      )
    );
  };

  // creating a copy of jobs and applying search, filter, sortby in these
  let derivedJobs = [...jobs];

  // search
  derivedJobs = derivedJobs.filter((value) => {
    const query = searchQuery.toLowerCase();

    if (value.companyName.toLowerCase().includes(query)) return true;
    if (value.position.toLowerCase().includes(query)) return true;
  });

  // status filter
  derivedJobs = derivedJobs.filter((value) => {
    if (filter === "") return value;

    return value.status === filter;
  });

  // sortby favourite

  derivedJobs = derivedJobs.sort(
    (a, b) => Number(b.isFavourite) - Number(a.isFavourite)
  );

  const jobId = jobs.findIndex((item) => item.id === notesId) ?? 0;

  return (
    <div className="relative">
      <div className="sticky top-0 md:top-3 z-50">
        <Header jobs={jobs} handleModalOpen={handleModalOpen} />
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
