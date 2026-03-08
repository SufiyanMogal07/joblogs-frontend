import { axiosInstance } from "@/lib/axios";
import { JobApplication } from "@/types";


export const createJob = async (data: JobApplication) => {
    const result = await axiosInstance.post("/jobs", data);

    return result.data;
}