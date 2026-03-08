import { axiosInstance } from "@/lib/axios";
import { loginValues, registerValues } from "@/types";

export const authRegister = async (data: registerValues) => {
  const result = await axiosInstance.post("/auth/register", data);

  return result.data;
};

export const authLogin = async (data: loginValues) => {
  const result = await axiosInstance.post("/auth/login", data);

  return result.data;
};