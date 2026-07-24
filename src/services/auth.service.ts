import { axiosInstance } from "@/lib/axios";
import { ApiResponse, loginValues, registerValues } from "@/types";

export const authRegister = async (data: registerValues) : ApiResponse  => {
  return await axiosInstance.post("/auth/register", data);
};

export const authLogin = async (data: loginValues) : ApiResponse => {
  return await axiosInstance.post("/auth/login", data);
};

export const authLogout = async () : ApiResponse => {
  return await axiosInstance.post("/auth/logout");
}