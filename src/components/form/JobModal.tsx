"use client";
import {
  Activity,
  Briefcase,
  Building2,
  Calendar,
  Notebook,
  Star,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { JobStatusList as jobstatus } from "@/utils";
import { JobApplication } from "@/types";
import { v4 as uuidv4 } from "uuid";
import Modal from "../Modal";

type JobModalProps = {
  isEdit?: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  handleModalClose: () => void;
  createorUpdateJob: (data: JobApplication, id?: string) => void;
  editData: JobApplication | null;
};

const childCss =
  "mt-10 md:m-0 h-[80vh] md:h-full md:max-h-150 w-[95%] md:w-full md:max-w-2xl lg:max-w-4xl xl:max-w-5xl rounded-xl bg-gray-900 relative";

const JobModal = ({
  isEdit = false,
  isModalOpen,
  setIsModalOpen,
  handleModalClose,
  createorUpdateJob,
  editData,
}: JobModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<JobApplication>({});

  const jobStatusVal = watch("status") ?? "";
  const isDisabled = jobStatusVal === "draft" || jobStatusVal === "";
  const lastAppliedDate = useRef<string | undefined>(undefined);
  const heading = isEdit
    ? "Update Job Application"
    : "Track a New Job Application";

  useEffect(() => {
    if (editData && isEdit) {
      reset({
        ...editData,
      });
    }
    if (!isModalOpen) {
      reset({});
    }
  }, [editData, isEdit, reset, isModalOpen]);

  useEffect(() => {
    // For empty state
    if (!jobStatusVal) {
      setValue("appliedAt", undefined);
      clearErrors("appliedAt");
    }

    // For draft state
    if (jobStatusVal === "draft") {
      lastAppliedDate.current = watch("appliedAt");
      setValue("appliedAt", undefined);
      clearErrors("appliedAt");
    }

    // For Other State's
    if (jobStatusVal !== "draft" && jobStatusVal && lastAppliedDate.current) {
      setValue("appliedAt", lastAppliedDate.current);
      clearErrors("appliedAt");
    }
  }, [jobStatusVal, clearErrors, setValue, watch]);

  if (!isModalOpen) {
    return null;
  }

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };
  getTomorrowDate();

  const onSubmit: SubmitHandler<JobApplication> = (data: JobApplication) => {
    if (!isEdit) data.id = uuidv4();

    createorUpdateJob(data);
    reset({});
    handleModalClose();
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      childCss={childCss}
      setIsModalOpen={setIsModalOpen}
    >
      <div className="sticky top-0 flex items-center justify-center border-b border-gray-700 p-5">
        <h2 className="text-lg md:text-2xl font-bold">{heading}</h2>
        <div className="p-1 rounded-full hover:bg-gray-800 absolute right-3 md:right-6 duration-300 ease-in-out">
          <X
            className=""
            onClick={() => {
              reset({});
              handleModalClose();
            }}
            aria-label="Close Modal"
          />
        </div>
      </div>

      <form
        id="jobForm"
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-8 overflow-y-auto h-[65vh] md:h-full md:max-h-120 py-4 px-3 md:px-10 m-3 md:m-5"
      >
        <div className="flex-column">
          <label className="form-label" htmlFor="">
            Company Name <span className="text-red-600 text-lg">*</span>
          </label>
          <div
            onClick={() => setFocus("companyName")}
            className="form-input-container"
          >
            <Building2 size={22} />
            <input
              className="form-input"
              type="text"
              placeholder="Enter Company Name"
              spellCheck={false}
              {...register("companyName", {
                required: "Company name is required",
              })}
            />
          </div>
          <p className="form-error">{errors.companyName?.message}</p>
        </div>

        <div onClick={() => setFocus("position")} className="flex-column">
          <label className="form-label" htmlFor="">
            Position <span className="text-red-600 text-lg">*</span>
          </label>
          <div className="form-input-container">
            <Briefcase size={22} />
            <input
              className="form-input text-white"
              placeholder="Enter Position"
              {...register("position", {
                required: "Position is required",
              })}
            />
          </div>
          <p className="form-error">{errors.position?.message}</p>
        </div>

        <div className="flex-column">
          <label className="form-label" htmlFor="">
            Choose Job Status <span className="text-red-600 text-lg">*</span>
          </label>
          <div className="form-input-container">
            <Activity size={22} />
            <select
              className="form-input bg-gray-800"
              {...register("status", {
                required: "Job status is required",
              })}
            >
              <option value={""}>None</option>
              {jobstatus.map((status, idx) => {
                return (
                  <option key={idx} value={status.toLowerCase()}>
                    {status}
                  </option>
                );
              })}
            </select>
          </div>
          <p className="form-error">{errors.status?.message}</p>
        </div>

        <div className="flex-column">
          <label htmlFor="">
            Priority <span className="text-red-600 text-lg">*</span>
          </label>

          <div
            className="form-input-container"
            onClick={() => setValue("isFavourite", !watch("isFavourite"))}
          >
            <Star
              size={22}
              className={`${
                watch("isFavourite")
                  ? "fill-yellow-400 stroke-yellow-500"
                  : "fill-none stroke-slate-300"
              }`}
            />
            <p className="">
              {watch("isFavourite")
                ? "Selected as Top Choice"
                : "Mark as Top Choice"}
            </p>
            <input className="hidden" {...register("isFavourite")} readOnly />
          </div>
          <p className="form-error"></p>
        </div>

        <div className="flex-column">
          <label htmlFor="" className="form-label">
            Notes {"(Optional)"}
          </label>

          <div className="form-input-container">
            <Notebook size={22} />
            <textarea
              placeholder="Enter Notes"
              className="form-input min-h-20 resize-none"
              {...register("notes")}
            ></textarea>
          </div>
          <p className="form-error"></p>
        </div>

        <div onClick={() => setFocus("appliedAt")} className="flex-column">
          <label className="form-label" htmlFor="">
            Date Applied{" "}
            {!isDisabled && <span className="text-red-600 text-lg">*</span>}
          </label>
          <div
            className={`form-input-container ${
              isDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Calendar
              size={22}
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
            {errors.appliedAt?.message && errors.appliedAt?.message}
          </p>
        </div>

        {!isEdit ? (
          <button className="primary-btn col-span-full mx-auto mt-5">
            Add Job
          </button>
        ) : (
          <button className="primary-btn col-span-full mx-auto mt-5">
            Update Job
          </button>
        )}
      </form>
    </Modal>
  );
};

export default JobModal;
