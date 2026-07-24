export const JOB_STATUS = [
  "draft",
  "applied",
  "interviewing",
  "onhold",
  "offer",
  "rejected",
  "ghosted"
] as const;

export const editableJobStatus = [...JOB_STATUS];

export const JOB_SOURCE = [
  "linkedin",
  "indeed",
  "company_website",
  "referral",
  "cold_call",
  "cold_email",
  "other",
] as const;

export type JobStatus = typeof JOB_STATUS[number];
export type JobSource = typeof JOB_SOURCE[number];
