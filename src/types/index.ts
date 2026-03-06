import z from "zod";

export type JobStatus =
  | "draft"
  | "applied"
  | "interviewing"
  | "offer"
  | "rejected" 
  | "";

export type responseType = {
  success: boolean,
  message: string,
  data?: unknown
}

const baseAuthObject = z.object({
  name: z.string().trim().min(3,"Full name is required"),
  email: z.string().trim().email({message: "Email is invalid!"}),
  password : z.string().min(6,"Password should be atleast of 6 characters").max(10,"Password maximum (10) characters reached")
});

export const registerSchema = baseAuthObject.extend({});
export const loginSchema = baseAuthObject.omit({name: true});

export type registerValues = z.infer<typeof registerSchema>;
export type loginValues = z.infer<typeof loginSchema>;

export type JobApplication = {
  id: string;
  companyName: string;
  position: string;
  notes?: string;
  isFavourite: boolean;
  status: JobStatus;
  appliedAt?: string; // ISO Date
  createdAt: string;
  updatedAt: string;
};
