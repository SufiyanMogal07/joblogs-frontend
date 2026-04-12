import { axiosInstance } from "@/lib/axios";
import { ApiResponse, JobApplication, JobData } from "@/types";

export const createJob = async (data: JobApplication) : ApiResponse =>
  await axiosInstance.post("/jobs", data);

export const getJobs = async (): ApiResponse<JobData[]> => await axiosInstance.get("/jobs");

export const updateJob = async (data: JobData) : ApiResponse => {
  const id = data.id;
  const result = await axiosInstance.patch(`/jobs/${id}`, data);

  return result.data ?? result;
};

export const deleteJob = async (id: number): ApiResponse => {
   const result = await axiosInstance.delete(`/jobs/${id}`);

  return result.data ?? result;
};


