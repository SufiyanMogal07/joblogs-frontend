import { axiosInstance } from "@/lib/axios";
import { ApiResponse } from "@/types";
import { userIdType } from "@/types/auth.type";
import { filterDataType, JobApplication, JobData } from "@/types/job.type";


export const createJob = async (data: JobApplication): ApiResponse =>
  await axiosInstance.post("/jobs", data);

export const getJobSortData = async (): ApiResponse => await axiosInstance.get("/jobs/sort-data");

export const getJobFilterData = async (): Promise<filterDataType> => await axiosInstance.get("/jobs/meta-data") ;

export const getJobs = async (query?: string): ApiResponse<JobData[]> =>
  await axiosInstance.get(`/jobs${query ? `?${query}` : ""}`);

export const updateJob = async (data: JobData): ApiResponse => {
  const id = data.id;
  const result = await axiosInstance.patch(`/jobs/${id}`, data);

  return result.data ?? result;
};

export const deleteJob = async (id: userIdType): ApiResponse => {
  const result = await axiosInstance.delete(`/jobs/${id}`);

  return result.data ?? result;
};

export const searchJob = async (query: string) => {
  if (query.length < 3) return;

  const result = await axiosInstance.get(`/jobs/search?q=${query}`);
  return result.data || result;
};
