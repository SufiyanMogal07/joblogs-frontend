import { withToast } from "@/components/shared/others/Toaster";
import { JobStatus } from "@/constants/enums";
import {
  createJob,
  deleteJob,
  getJobs,
  updateJob,
} from "@/services/job.service";
import { responseType } from "@/types";
import { userIdType } from "@/types/auth.type";
import { JobData } from "@/types/job.type";
import { toast } from "sonner";
import { create } from "zustand";

// todo : #1 priority high
// add error state and it fnc whenever error occurs in job we have to set the error object with is there any error and message. shape of object is : {isError: boolean, message: string}
// seperate this states and function in hooks and different file

// interface errorMessageType {
//   isError: boolean;
//   message: string;
// }

interface JobStore {
  // jobs
  jobs: JobData[];
  isLoading: boolean;
  search: string;
  // error?: errorMessageType;
  // setError?: (err: errorMessageType) => void;
  setSearch: (query: string) => void;
  fetchJobs: (query?: string) => Promise<void>;
  handlePriority: (job: JobData) => Promise<void>;
  handleJobStatus: (job: JobData, status: JobStatus) => Promise<void>;
  createJob: (job: JobData) => void;
  updateJob: (job: JobData) => void;
  deleteJob: (id: userIdType) => Promise<void>;
  clearJobState: () => void;

  // ui
  datePopup: boolean;
  setDatePopupClose: () => void;
  confirmStatusUpdateWithDate: (appliedDate: string) => Promise<void>;
  pendingStatusUpdate?: { job: JobData; status: JobStatus } | null;
  clearDateData: () => void;
}

export const useJobStore = create<JobStore>((set, get) => ({
  // jobs
  jobs: [] as JobStore["jobs"],
  isLoading: false,
  search: "",
  setSearch: (query) => {
    if (typeof query !== "string") return;
    set({ search: query });
  },
  fetchJobs: async (query?: string) => {
    set({ isLoading: true });
    try {
      const result = await getJobs(query);
      const rawData = result.data ?? [];

      if (result.success) {
        const cleaned = rawData?.map((job) => {
          return {
            ...job,
          };
        });
        set({ jobs: cleaned });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      
    } finally {
      set({ isLoading: false });
    }
  },
  handlePriority: async (job) => {
    const promise = (async () => {
      const result = await updateJob({ ...job, priority: !job.priority });

      if (!result.success) {
        throw new Error(result.message);
      }
      await get().fetchJobs();

      return result.message;
    })();

    withToast(promise);
  },
  handleJobStatus: async (job, status) => {
    if (status !== "draft" && !job.appliedAt) {
      set({
        datePopup: true,
        pendingStatusUpdate: { job, status },
      });
      return;
    }

    try {
      const result = await updateJob({ ...job, status });

      if (result.success) {
        toast.success(result.message);
        get().fetchJobs();
      } else {
        toast.error(result.message);
      }
    } catch (error) {}
  },
  createJob: async (data: JobData) => {
    if (!data) return;

    if (data.status === "draft") data.appliedAt = undefined;

    try {
      const result: responseType = await createJob(data);

      if (result.success) {
        toast.success(result.message);
        get().fetchJobs();
      } else {
        toast.error(result.message);
      }
    } catch (error) {}
  },
  updateJob: async (data: JobData) => {
    if (!data.id) return;
    const result = await updateJob(data);
    if (result.success) {
      toast.success(result.message);
      get().fetchJobs();
    } else {
      toast.error(result.message);
    }
  },
  deleteJob: async (id) => {
    if (!id) return;

    const deleteFlag = confirm("Are you sure want to delete job application?");

    if (deleteFlag) {
      const result = await deleteJob(id);
      if (result.success) {
        toast.success(result.message);
        get().clearJobState();
        get().fetchJobs();
      } else {
        toast.error(result.message);
      }
    }
  },
  clearJobState: () => set({ jobs: [], isLoading: false }),

  // ui
  datePopup: false,
  setDatePopupClose: () => set({ datePopup: false }),
  confirmStatusUpdateWithDate: async (appliedDate) => {
    const { pendingStatusUpdate } = get();
    if (!pendingStatusUpdate) return;

    const { job, status } = pendingStatusUpdate;
    try {
      const result = await updateJob({
        ...job,
        status,
        appliedAt: appliedDate,
      });

      if (result.success) {
        toast.success(result.message);
        get().fetchJobs();

        set({ datePopup: false, pendingStatusUpdate: null });
      }
    } catch (error) {}
  },
  clearDateData: () => set({ datePopup: false, pendingStatusUpdate: null }),
}));
