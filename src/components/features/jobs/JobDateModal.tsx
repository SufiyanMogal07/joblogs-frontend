"use client";
import { useJobStore } from "@/stores/useJobStore";
import React, { useEffect } from "react";
import Modal from "@/components/shared/others/Modal";
import { Calendar } from "lucide-react";
import { useForm } from "react-hook-form";

interface JobDate {
  appliedAt: string;
}

function JobDateModal() {
  const datePopup = useJobStore((state) => state.datePopup);
  const clearDateData = useJobStore((state) => state.clearDateData);
  const confirmStatusUpdateWithDate = useJobStore((state) => state.confirmStatusUpdateWithDate);

  const { register, handleSubmit, setFocus, reset } = useForm<JobDate>({
    defaultValues: {
      appliedAt: "",
    },
  });

  // Ensuring the form resets when the modal closes
  useEffect(() => {
    if (!datePopup) {
      reset();
    }
  }, [datePopup, reset]);

  const onSubmit = (data: JobDate) => {
    if (data.appliedAt) {
      confirmStatusUpdateWithDate(data.appliedAt);
    }
  };

  return (
    <Modal
      isModalOpen={datePopup}
      childCss="p-6 sm:p-8 w-[90%] max-w-sm h-auto rounded-xl bg-gray-900 border border-gray-800 text-center shadow-xl"
      handleModalClose={clearDateData}
    >
      <div className="mb-6">
        {/* Added a clean icon container to anchor the header */}
        <div className="mx-auto bg-gray-800 w-12 h-12 flex items-center justify-center rounded-full mb-4 border border-gray-700/50">
          <Calendar size={24} className="text-gray-300" />
        </div>
        <h1 className="text-xl font-bold text-gray-100">Select Date</h1>
        <p className="text-sm text-gray-400 mt-1">When did you apply for this job?</p>
      </div>

      <div
        onClick={() => setFocus("appliedAt")}
        className="form-input-container mb-8 cursor-pointer hover:border-gray-700 transition-colors"
      >
        <Calendar
          size={20}
          className="text-gray-400 shrink-0"
        />
        <input
          className="form-input cursor-pointer"
          style={{ colorScheme: "dark" }} // Forces native date picker to match the dark theme
          onClick={(e: React.MouseEvent<HTMLInputElement>) => {
            e.currentTarget.showPicker?.();
          }}
          type="date"
          {...register("appliedAt")}
        />
      </div>

      {/* Used a grid layout so the buttons are perfectly even and fill the space properly */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <button
          onClick={clearDateData}
          className="dashboard-btn !bg-gray-800 !border-gray-700 hover:!bg-gray-700 !text-gray-300 !py-2.5"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit(onSubmit)}
          className="dashboard-btn !bg-indigo-700 !border-indigo-600 hover:!bg-indigo-600 !text-white !py-2.5"
        >
          Save Date
        </button>
      </div>
    </Modal>
  );
}

export default JobDateModal;