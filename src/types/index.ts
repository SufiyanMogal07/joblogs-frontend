import { JOB_SOURCE, JOB_STATUS } from "@/constants/enums";
import z from "zod";

// Object Shape
export type responseType<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};

// Promise wrapped Object
export type ApiResponse<T = undefined> = Promise<responseType<T>>;

const baseAuthObject = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name should be atleast of 3 characters!")
    .max(30, "Name should not exceed 30 characters!"),
  email: z
    .string()
    .trim()
    .email("Invalid email address!")
    .max(50, "Email should not exceed 50 characters!"),
  password: z.string().min(6,"Password should be atleast of 6 characters").max(15,"Password should not exceed 15 characters!"),
});

export const registerSchema = baseAuthObject.extend({});
export const loginSchema = baseAuthObject.omit({ name: true });

export type registerValues = z.infer<typeof registerSchema>;
export type loginValues = z.infer<typeof loginSchema>;

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
    priority: z.boolean(),
    notes: z.string().trim().optional(),
    appliedAt: z
      .string({
        error: () => ({ message: "Applied Date is required" }),
      })
      .optional(),
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
  id: z.number(),
});

export const UserProfileSchema = z.object({
  name: z.string().trim().min(3, "Full name is required"),
  email: z.email().trim().min(4, "Email is required"),
});

// export type JobApplicationForm = z.infer<typeof JobApplicationSchema>;
export type JobApplication = z.infer<typeof JobApplicationSchema>;
export type JobData = z.infer<typeof JobDataSchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;
