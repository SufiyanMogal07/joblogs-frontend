export const JOB_STATUS = [
  "draft",
  "applied",
  "interviewing",
  "offer",
  "rejected"
] as const;

export const JOB_SOURCE = [
  "linkedin",
  "indeed",
  "company_website",
  "referral",
  "other",
] as const;

export type JobStatus = typeof JOB_STATUS[number];
export type JobSource = typeof JOB_SOURCE[number];
