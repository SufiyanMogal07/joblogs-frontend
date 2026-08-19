import { axiosInstance } from "@/lib/axios";
import { ApiResponse } from "@/types";
import { UserProfile } from "@/types/auth.type";

export const getUserJobMetrics = async (): ApiResponse =>
  await axiosInstance.get("/user/metrics");

export const getUserProfile = async (): ApiResponse => {
  return axiosInstance.get("/user/profile");
};

export const updateUserProfile = async (data: UserProfile): ApiResponse => {
  return axiosInstance.patch("/user/profile", data);
};
