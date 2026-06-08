"use client";
import { JobStatus } from "@/constants/enums";
import { getUserJobMetrics } from "@/services/userService";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type StatCardProps = {
  title: string;
  count: number;
  successPercentage: number;
};

type metricsDataType = {
  status: JobStatus;
  _count: {
    status: number;
  };
};

const StatCard = ({ title, count, successPercentage }: StatCardProps) => {
  return (
    <div
      className={`bg-linear-to-tr from-slate-950/80 to-slate-900 border border-t-4 rounded-xl shrink-0 min-w-55 max-w-80 w-full p-4 md:p-6 md:w-80 cursor-pointer shadow-md ${statusMapping[title as JobStatus].color}`}
    >
      <p className="text-slate-400 font-bold text-lg md:text-xl">
        {statusMapping[title as JobStatus].label ?? title}
      </p>
      <div className="my-4 flex items-baseline gap-2">
        <h3 className="text-slate-200 font-extrabold text-5xl md:text-6xl">{count}</h3>
        {/* <span className="font-bold text-xl text-emerald-400">+12%</span> */}
      </div>
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
    <div className="bg-linear-to-tr from-slate-950/80 to-slate-900 border border-slate-700 rounded-xl shrink-0 min-w-55 max-w-80 w-full p-4 md:p-6 md:w-80 cursor-pointer shadow-md animate-pulse">
      <div className="h-5 w-36 bg-slate-700 rounded-md" />

      <div className="my-4">
        <div className="h-16 w-24 bg-slate-700 rounded-md" />
      </div>

      <div className="h-4 w-20 bg-slate-700 rounded-md" />
    </div>
  );
};

const statusMapping = {
  total: {
    label: "Total Applications",
    position: 1,
    color: "border-t-slate-200 border-x-slate-800 border-b-slate-800",
  },
  applied: {
    label: "Applied",
    position: 2,
    color: "border-t-blue-500 border-x-slate-800 border-b-slate-800",
  },
  interviewing: {
    label: "Interviews",
    position: 3,
    color: "border-t-amber-500 border-x-slate-800 border-b-slate-800",
  },
  offer: {
    label: "Offers",
    position: 4,
    color: "border-t-emerald-500 border-x-slate-800 border-b-slate-800",
  },
  rejected: {
    label: "Rejected",
    position: 5,
    color: "border-t-rose-500 border-x-slate-800 border-b-slate-800",
  },
  draft: {
    label: "Drafts",
    position: 6,
    color: "border-t-slate-500 border-x-slate-800 border-b-slate-800",
  },
};

const DEFAULT_STATUS: metricsDataType[] = Object.keys(statusMapping).map(
  (key) => ({
    status: key as JobStatus,
    _count: { status: 0 },
  }),
);

const Page = () => {
  const [metricsData, setMetricsData] = useState<metricsDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getMetricsData = async () => {
    setLoading(true);

    try {
      const result = await getUserJobMetrics();
      if (result.success) {
        const data = result.data ?? [];

        const merged = DEFAULT_STATUS.map((defaultEntry) => {
          const found = data.find(
            (d: metricsDataType) => d.status === defaultEntry.status,
          );

          return found ?? defaultEntry;
        });
        setMetricsData(merged);
        
      } else {
        toast.error(result.message);
      }
    } catch (err) {
    } finally {
      setTimeout(() =>setLoading(false), 1000)
      
    }
  };

  useEffect(() => {
    getMetricsData();
  }, []);

  const sortedMetricsData = [...metricsData].sort(
    (a, b) =>
      statusMapping[a.status].position - statusMapping[b.status].position,
  );

  if (loading) {
    return (
      <div className="dashboard-metrics flex flex-col md:flex-col gap-7 p-6">
        {Array.from({ length: 6 }).map((_, idx) => {
          return <StatCardSkeleton key={idx} />
  })}
      </div>
    );
  }

  return (
    <div className="w-full p-3 pt-8 md:p-6">
      <section className="dashboard-metrics flex flex-col items-center md:flex-row gap-7 overflow-x-auto pb-4 font-mono">
        {sortedMetricsData.map((value, idx) => {
          return (
            <StatCard
              title={value.status}
              count={value._count.status}
              successPercentage={14}
              key={idx}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Page;
