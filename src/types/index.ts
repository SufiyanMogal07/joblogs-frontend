export type JobStatus =
  | "draft"
  | "applied"
  | "interviewing"
  | "offer"
  | "rejected" 
  | "";

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
