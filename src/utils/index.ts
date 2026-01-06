import { JobStatus } from "@/types";


export const JobStatusList = ["Draft","Applied","Interviewing","Offer","Rejected"];

export const formatDate = (date?: string) => {
  if (!date) return "Not applied yet";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const capitalizeWords = (str: string) => {
  return str[0].toUpperCase() + str.slice(1)
};

export const getStatusBadgeCss = (status: JobStatus) => {
  const base =
    "flex items-center text-xs font-semibold px-3 py-1 rounded-full border capitalize";

  switch (status) {
    case "draft":
      return (
        base +
        " bg-slate-700/35 text-slate-300 border-slate-600"
      );

    case "applied":
      return (
        base +
        " bg-blue-500/15 text-blue-400 border-blue-500/30"
      );

    case "interviewing":
      return (
        base +
        " bg-amber-500/15 text-amber-400 border-amber-500/30"
      );

    case "offer":
      return (
        base +
        " bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
      );

    case "rejected":
      return (
        base +
        " bg-rose-500/15 text-rose-400 border-rose-500/30"
      );

    default:
      return base;
  }
};

