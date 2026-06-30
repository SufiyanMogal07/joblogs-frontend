import { JobStatus } from "@/constants/enums";
import {
  createJob,
  deleteJob,
  getJobs,
  updateJob,
} from "@/services/jobService";
import { JobData, responseType } from "@/types";
import { toast } from "sonner";
import { create } from "zustand";

interface JobStore {
  jobs: JobData[];
  datePopup: boolean;
  pendingStatusUpdate?: { job: JobData; status: JobStatus } | null;
  isLoading: boolean;
  search: string;
  setDatePopupClose: () => void;
  setSearch: (query: string) => void;
  fetchJobs: (query?: string) => Promise<void>;
  handlePriority: (job: JobData) => Promise<void>;
  handleJobStatus: (job: JobData, status: JobStatus) => Promise<void>;
  createJob: (job: JobData) => void;
  updateJob: (job: JobData) => void;
  deleteJob: (id: number) => Promise<void>;
  confirmStatusUpdateWithDate: (appliedDate: string) => Promise<void>;
  clearDateData: () => void;
  clearJobState: () => void;
}

export const useJobStore = create<JobStore>((set, get) => ({
  jobs: [] as JobStore["jobs"],
  datePopup: false,
  isLoading: false,
  search: "",
  setDatePopupClose: () => set({ datePopup: false }),
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
            appliedAt: job.appliedAt?.split("T")[0],
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
    try {
      const result = await updateJob({ ...job, priority: !job.priority });

      if (result.success) {
        toast.success(result.message);
        await get().fetchJobs();
      } else {
        toast.error(result.message);
      }
    } catch (error) {}
  },
  handleJobStatus: async (job, status) => {
    if (status !== "draft" && !job.appliedAt) {
      set({
        datePopup: true,
        pendingStatusUpdate: { job, status },
      });
      return;
    }
    // job.appliedAt = status !== "draft" && !job.appliedAt ? date.toISOString() : appliedDate;

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
  clearJobState: () => set({ jobs: [], isLoading: false }),
}));
