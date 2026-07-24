import {
  BriefcaseBusiness,
  FileText,
  Send,
  MessagesSquare,
  PauseCircle,
  BadgeCheck,
  XCircle,
  Clock3,
} from "lucide-react";
import { JobStatus } from "./enums";

export type MetricStatus = JobStatus | "total";

export const METRIC_ICONS: Record<MetricStatus, React.ElementType> = {
  total: BriefcaseBusiness,
  draft: FileText,
  applied: Send,
  interviewing: MessagesSquare,
  onhold: PauseCircle,
  offer: BadgeCheck,
  rejected: XCircle,
  ghosted: Clock3,
};

export const METRIC_COLORS: Record<MetricStatus, string> = {
  total: "text-sky-400",
  draft: "text-slate-400",
  applied: "text-blue-400",
  interviewing: "text-amber-400",
  onhold: "text-orange-400",
  offer: "text-emerald-400",
  rejected: "text-rose-400",
  ghosted: "text-zinc-400",
};