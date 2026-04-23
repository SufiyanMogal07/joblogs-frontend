import { axiosInstance } from "@/lib/axios";
import { ApiResponse, JobApplication, JobData } from "@/types";

export const createJob = async (data: JobApplication): ApiResponse =>
  await axiosInstance.post("/jobs", data);

export const getJobs = async (query?: string): ApiResponse<JobData[]> =>
  await axiosInstance.get(`/jobs${query ? `?${query}` : ""}`);

export const updateJob = async (data: JobData): ApiResponse => {
  const id = data.id;
  const result = await axiosInstance.patch(`/jobs/${id}`, data);

  return result.data ?? result;
};

export const deleteJob = async (id: number): ApiResponse => {
  const result = await axiosInstance.delete(`/jobs/${id}`);

  return result.data ?? result;
};

export const searchJob = async (query: string) => {
  if (query.length < 3) return;

  const result = await axiosInstance.get(`/jobs/search?q=${query}`);
  return result.data ?? result;
};
