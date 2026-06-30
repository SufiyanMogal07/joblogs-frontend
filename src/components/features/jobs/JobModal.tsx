"use client";
import {
  Activity,
  Briefcase,
  Building2,
  Calendar,
  Link,
  Link2,
  Notebook,
  Star,
  X,
} from "lucide-react";
import React, { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { JOB_SOURCE, JOB_STATUS, JobStatus } from "@/constants/enums";
import { JobApplication, JobData, JobDataSchema } from "@/types";
import Modal from "../../shared/others/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { capitalizeWords, getTomorrowDate } from "@/utils/utils";

type JobModalProps = {
  isEdit?: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  handleModalClose: () => void;
  createorUpdateJob: (data: JobData, id?: number) => void;
  editData: JobData | null;
};

const childCss =
  "w-full sm:w-[95%] md:w-full md:max-w-3xl lg:max-w-4xl h-[100dvh] sm:h-[95dvh] md:h-[90vh] rounded-t-xl sm:rounded-xl bg-gray-900 relative flex flex-col shadow-2xl shadow-black/40 border border-gray-800 sm:border-gray-700/60";

const JobModal = ({
  isEdit = false,
  isModalOpen,
  setIsModalOpen,
  handleModalClose,
  createorUpdateJob,
  editData,
}: JobModalProps) => {
  const currentDate = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    reset,
    setValue,
    clearErrors,
    getValues,

    formState: { errors },
  } = useForm<JobData>({
    resolver: zodResolver(JobDataSchema),
    defaultValues: editData ?? {
      id: 0,
      companyName: "",
      position: "",
      status: "draft" as JobApplication["status"],
      source: "other" as JobApplication["source"],
      priority: false,
      appliedAt: currentDate,
      notes: "",
    },
  });

  const jobStatusVal = watch("status") ?? "";
  const isDisabled = jobStatusVal === "draft";
  const lastAppliedDate = useRef<string | undefined>(undefined);
  const heading = isEdit
    ? "Update Job Application"
    : "Track a New Job Application";

  useEffect(() => {
    // For empty state
    if (!jobStatusVal) {
      setValue("appliedAt", undefined);
      clearErrors("appliedAt");
    }

    // For draft state
    if (jobStatusVal === "draft") {
      lastAppliedDate.current = getValues("appliedAt");
      setValue("appliedAt", undefined);
      clearErrors("appliedAt");
    }

    // For Other State's
    if (jobStatusVal !== "draft" && jobStatusVal && lastAppliedDate.current) {
      setValue("appliedAt", lastAppliedDate.current);
      clearErrors("appliedAt");
    }
  }, [jobStatusVal, clearErrors, setValue, getValues]);

  //   useEffect(() => {
  //   if (!isModalOpen) return;
  //   if (!editData && !isEdit) return;

  //   const timer = setTimeout(() => {
  //     if (jobStatusVal === "draft") {
  //       setFocus("status");
  //       return;
  //     }
  //     if(jobStatusVal && !editData?.appliedAt) {
  //       setFocus("appliedAt");
  //       return;
  //     }
  //     if (!editData?.jobDescription) {
  //       setFocus("jobDescription");
  //       return;
  //     }
  //     if (!editData?.jobUrl) {
  //       setFocus("jobUrl");
  //       return;
  //     }
  //   }, 100);

  //   return () => clearTimeout(timer);
  // }, [isModalOpen, jobStatusVal, editData, setFocus]);

  const onSubmit: SubmitHandler<JobData> = (data: JobData) => {
    if (isEdit && editData) {
      createorUpdateJob(data, editData.id);
    } else {
      createorUpdateJob(data);
    }
    reset();
    handleModalClose();
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <Modal
      isModalOpen={isModalOpen}
      childCss={childCss}
      handleModalClose={handleModalClose}
    >
      <div className="sticky top-0 flex items-center justify-center border-b border-gray-700/80 px-4 py-3.5 sm:p-5 shrink-0 bg-gray-900 rounded-t-xl z-10">
        <h2 className="text-base sm:text-lg md:text-2xl font-bold text-center px-8 tracking-tight">
          {heading}
        </h2>
        <button
          type="button"
          className="p-1.5 rounded-full hover:bg-gray-700/60 absolute right-2 sm:right-3 md:right-6 transition-colors duration-200 cursor-pointer"
          onClick={() => {
            reset();
            handleModalClose();
          }}
          aria-label="Close Modal"
        >
          <X size={20} className="text-gray-400" />
        </button>
      </div>

      <form
        id="jobForm"
        action=""
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-6 lg:gap-x-10 overflow-y-auto px-4 sm:px-5 md:px-6 lg:px-10 py-5 sm:py-6 flex-1 min-h-0"
      >
        <input type="hidden" {...register("id")} />
        <div className="flex-column">
          <label className="form-label" htmlFor="">
            Company Name <span className="text-red-500 text-sm">*</span>
          </label>
          <div
            onClick={() => setFocus("companyName")}
            className="form-input-container"
          >
            <Building2 size={20} className="text-gray-400 shrink-0" />
            <input
              className="form-input"
              type="text"
              placeholder="Enter Company Name"
              spellCheck={false}
              {...register("companyName")}
            />
          </div>
          <p className="form-error">{errors.companyName?.message}</p>
        </div>

        <div onClick={() => setFocus("position")} className="flex-column">
          <label className="form-label" htmlFor="">
            Position <span className="text-red-500 text-sm">*</span>
          </label>
          <div className="form-input-container">
            <Briefcase size={20} className="text-gray-400 shrink-0" />
            <input
              className="form-input text-white"
              placeholder="Enter Position"
              {...register("position")}
            />
          </div>
          <p className="form-error">{errors.position?.message}</p>
        </div>

        <div className="flex-column">
          <label className="form-label" htmlFor="">
            Job Status
          </label>
          <div className="form-input-container">
            <Activity size={20} className="text-gray-400 shrink-0" />
            <select className="form-input bg-gray-800" {...register("status")}>
              <option value={""}>None</option>
              {JOB_STATUS.map((status, idx) => {
                return (
                  <option key={idx} value={status.toLowerCase()}>
                    {capitalizeWords(status)}
                  </option>
                );
              })}
            </select>
          </div>
          <p className="form-error">{errors.status?.message}</p>
        </div>

        <div className="flex-column">
          <label className="form-label" htmlFor="">
            Job Source
          </label>
          <div className="form-input-container">
            <Link size={20} className="text-gray-400 shrink-0" />
            <select
              className="form-input bg-gray-800"
              {...register("source", {
                required: "Job Source is required",
              })}
            >
              <option value={""}>None</option>
              {JOB_SOURCE.map((source, idx) => {
                return (
                  <option key={idx} value={source.toLowerCase()}>
                    {capitalizeWords(source)}
                  </option>
                );
              })}
            </select>
          </div>
          <p className="form-error">{errors.source?.message}</p>
        </div>

        <div className="flex-column">
          <label htmlFor="" className="form-label">
            Priority
          </label>

          <div
            className={`form-input-container cursor-pointer select-none transition-colors duration-200 ${
              watch("priority")
                ? "ring-1 ring-yellow-500/40 bg-gray-800/80"
                : ""
            }`}
            onClick={() => setValue("priority", !watch("priority"))}
          >
            <Star
              size={20}
              className={`shrink-0 transition-colors duration-200 ${
                watch("priority")
                  ? "fill-yellow-400 stroke-yellow-500"
                  : "fill-none stroke-slate-400"
              }`}
            />
            <p className="text-sm sm:text-base">
              {watch("priority")
                ? "Selected as Top Choice"
                : "Mark as Top Choice"}
            </p>
            <input className="hidden" {...register("priority")} readOnly />
          </div>
            <p className="form-error"></p>
        </div>

        <div onClick={() => setFocus("appliedAt")} className="flex-column">
          <label className="form-label" htmlFor="">
            Date Applied{" "}
          </label>
          <div
            className={`form-input-container transition-opacity duration-200 ${
              isDisabled ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            <Calendar
              size={20}
              className="text-gray-400 shrink-0"
              onClick={() => {
                if (!isDisabled) setFocus("appliedAt");
              }}
            />
            <input
              className={`form-input ${
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              max={getTomorrowDate()}
              type="date"
              onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                if (!isDisabled) {
                  e.currentTarget.showPicker?.();
                }
              }}
              disabled={isDisabled}
              {...register("appliedAt", {
                validate: (value) => {
                  if (isDisabled) return true;
                  return value ? true : "Job applied date is required";
                },
              })}
            />
          </div>

          <p className="form-error">
            {errors.appliedAt && errors.appliedAt?.message}
          </p>
        </div>

        <div className="flex-column">
          <label htmlFor="" className="form-label">
            Job Description
          </label>
          <div className="form-input-container items-start">
            <Notebook size={20} className="text-gray-400 shrink-0 mt-0.5" />
            <textarea
              placeholder="Add job description about this application"
              className="form-input min-h-24 resize-none"
              {...register("jobDescription")}
            ></textarea>
          </div>
          <p className="form-error">{errors?.jobDescription?.message}</p>
        </div>

        <div className="flex-column">
          <label htmlFor="" className="form-label">
            Job Link
          </label>
          <div className="form-input-container items-start">
            <Link2 size={20} className="text-gray-400 shrink-0 mt-0.5" />
            <textarea
              placeholder="Add job posting link"
              className="form-input min-h-24 resize-none"
              {...register("jobUrl")}
            ></textarea>
          </div>
          <p className="form-error">{errors?.jobUrl?.message}</p>
        </div>

        <div className="flex-column lg:col-span-2">
          <label htmlFor="" className="form-label">
            Notes
          </label>
          <div className="form-input-container items-start">
            <Notebook size={20} className="text-gray-400 shrink-0 mt-0.5" />
            <textarea
              placeholder="Add any notes about this application..."
              className="form-input min-h-24 resize-none"
              {...register("notes")}
            ></textarea>
          </div>
        </div>
      </form>

      <div className="shrink-0 py-3 sm:py-4 border-t border-gray-700/80 bg-gray-900 rounded-b-xl">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="primary-btn mx-auto cursor-pointer"
        >
          {isEdit ? "Update Job" : "Add Job"}
        </button>
      </div>
    </Modal>
  );
};

export default JobModal;
