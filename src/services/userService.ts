import { axiosInstance } from "@/lib/axios";
import { ApiResponse, UserProfile } from "@/types";

export const getUserJobMetrics = async (): ApiResponse =>
  await axiosInstance.get("/user/metrics");

export const getUserProfile = async (): ApiResponse => {
  return axiosInstance.get("/user/profile");
};

export const updateUserProfile = async (data: UserProfile): ApiResponse => {
  return axiosInstance.post("/user/profile", data);
};
