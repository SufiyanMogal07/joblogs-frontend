import { axiosInstance } from "@/lib/axios";
import { ApiResponse, JobApplication, JobData } from "@/types";

export const createJob = async (data: JobApplication) : ApiResponse =>
  await axiosInstance.post("/jobs", data);

export const getJobs = async (): ApiResponse<JobData[]> => await axiosInstance.get("/jobs");

export const updateJob = async (data: JobData) : ApiResponse => {
  const id = data.id;
  const result = await axiosInstance.patch(`/jobs/${id}`, data);

  return result.data;
};

export const deleteJob = async () => {};
