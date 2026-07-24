"use client";
import {
  METRIC_COLORS,
  METRIC_ICONS,
  MetricStatus,
} from "@/constants/dashboard";
import { JobStatus } from "@/constants/enums";
import { getUserJobMetrics } from "@/services/user.service";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type StatCardProps = {
  label: string;
  status: MetricStatus;
  count: number;
};

type metricsDataType = {
  status: JobStatus | "total";
  label: string;
  count: number;
};

const StatCard = ({ label, status, count }: StatCardProps) => {
  const Icon = METRIC_ICONS[status];
  const color = METRIC_COLORS[status];
  return (
    <div
      className={`bg-card border border-border rounded-xl shrink-0 min-w-55 max-w-80 w-full p-4 md:p-6 md:w-80 cursor-pointer shadow-lg`}
    >
      <div className="flex items-center gap-x-4">
        <Icon className={`h-8 w-8 ${color}`} />
        <p className="text-slate-400 font-bold text-lg md:text-xl">{label}</p>
      </div>
      <h3 className="my-5 text-slate-200 font-extrabold text-5xl md:text-6xl">
        {count}
      </h3>
      <Link
        href={"/dashboard/jobs"}
        className="text-sm md:text-base font-bold text-slate-400 hover:underline"
      >
        View More
      </Link>
    </div>
  );
};

const StatCardSkeleton = () => {
  return (
    <div className="border border-border rounded-xl shrink-0 min-w-55 max-w-80 w-full p-4 md:p-6 md:w-80 cursor-pointer shadow-md animate-pulse">
      <div className="h-5 w-36 bg-card rounded-md" />

      <div className="my-5">
        <div className="h-18 w-24 bg-card rounded-md" />
      </div>

      <div className="h-4 w-20 bg-card rounded-md" />
    </div>
  );
};

const Page = () => {
  const [metricsData, setMetricsData] = useState<metricsDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getMetricsData = async () => {
    setLoading(true);

    try {
      const result = await getUserJobMetrics();
      if (result.success) {
        const data = result.data ?? [];
        setMetricsData(data);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  useEffect(() => {
    getMetricsData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-metrics flex flex-col md:flex-row gap-7 p-6">
        {Array.from({ length: 6 }).map((_, idx) => {
          return <StatCardSkeleton key={idx} />;
        })}
      </div>
    );
  }

  return (
    <div className="w-full p-3 pt-8 md:p-6">
      <section className="dashboard-metrics flex flex-col items-center md:flex-row gap-7 overflow-x-auto pb-4 font-mono">
        {metricsData.map((value, idx) => {
          return (
            <StatCard
              label={value.label}
              status={value.status}
              count={value.count}
              key={idx}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Page;
