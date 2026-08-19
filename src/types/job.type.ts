import { JOB_SOURCE, JOB_STATUS } from "@/constants/enums";
import z from "zod";

 export type filterDataType = {
    success: boolean;
    message: string;
    data: {
      status: string[],
      source: string[]
    }
}


export const JobApplicationSchema = z
  .object({
    companyName: z.string().trim().min(3, "Company name is required!"),
    position: z.string().min(3, "Job position is required!"),
    status: z.enum(JOB_STATUS, {
      error: () => ({ message: "Job Status is required  " }),
    }),
    source: z.enum(JOB_SOURCE, {
      error: () => ({ message: "Job Source is required" }),
    }),
    jobUrl: z
      .string()
      .max(1000, "Job URL cannot exceed 1000 characters.")
      .optional(),
    jobDescription: z
      .string()
      .max(5000, "Job description cannot exceed 5000 characters.")
      .optional(),
    priority: z.boolean(),
    notes: z.string().trim().optional(),
    appliedAt: z
      .string({
        error: () => ({ message: "Applied Date is required" }),
      })
      .optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.status !== "draft" && !data.appliedAt) {
      ctx.addIssue({
        code: "custom",
        message: "Applied Date is required when the job status is not draft",
        path: ["appliedAt"],
      });
    }
  });

export const JobDataSchema = JobApplicationSchema.extend({
  id: z.string(),
});

export type JobMetaData = {
  status: string[];
  source: string[];
}

export type JobApplication = z.infer<typeof JobApplicationSchema>;
export type JobData = z.infer<typeof JobDataSchema>;