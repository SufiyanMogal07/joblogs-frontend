import axios from "axios";
import { toast } from "sonner";



export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message ?? "Something went wrong!";

      toast.error(message);
    }
    return Promise.reject(error);
  },
);
