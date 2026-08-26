import { JobStatus } from "@/constants/enums";

export const formatDate = (date?: string) => {
  if (!date) return "Not applied yet";

  const newDate = new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return  newDate
};

export const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate());
  return tomorrow.toISOString().split("T")[0];
};

export const cleanUnderScore = (word: string) => {
  return word.replaceAll("_"," ");
}

export const capitalizeWords = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const capitalizeSentence = (strArr: string[]) => {
  if(!strArr) return strArr;

  return strArr.map((value) => capitalizeWords(value)).join(" ");
}

const STATUS_CONFIG: Record<JobStatus, { badge: string; border: string }> = {
  draft: {
    badge: "bg-slate-500/15 text-slate-300 border-slate-500/30",
    border: "border-t-slate-500 hover:shadow-slate-500/30",
  },

  applied: {
    badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    border: "border-t-blue-500 hover:shadow-blue-500/30",
  },

  interviewing: {
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    border: "border-t-amber-500 hover:shadow-amber-500/30",
  },

  onhold: {
    badge: "bg-orange-500/15 text-orange-400 border-orange-500/30",
    border: "border-t-orange-500 hover:shadow-orange-500/30",
  },

  offer: {
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    border: "border-t-emerald-500 hover:shadow-emerald-500/30",
  },

  rejected: {
    badge: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    border: "border-t-rose-500 hover:shadow-rose-500/30",
  },

  ghosted: {
    badge: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
    border: "border-t-zinc-500 hover:shadow-zinc-500/30",
  },
};

export const getStatusBadgeCss = (status: JobStatus) => {
  const base = "flex items-center text-xs font-semibold px-3 py-1 rounded-full border capitalize";
  const styles = STATUS_CONFIG[status]?.badge || "";
  return `${base} ${styles}`;
};

export const getStatusBorderColor = (status: JobStatus) => {
  const borderStyle = STATUS_CONFIG[status]?.border || "";
  return borderStyle ? `border-t-4 ${borderStyle}` : "";
};
