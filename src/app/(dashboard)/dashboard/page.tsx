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

const statusMapping = {
  total: {
    label: "Total Applications",
    position: 1,
    color: "bg-[#0f172a] border-t-4 border-t-slate-200 border-x-slate-800 border-b-slate-800"
  },
  applied: {
    label: "Applied",
    position: 2,
    color: "bg-[#0f172a] border-t-4 border-t-blue-500 border-x-slate-800 border-b-slate-800"
  },
  interviewing: {
    label: "Interviews",
    position: 3,
    color: "bg-[#0f172a] border-t-4 border-t-amber-500 border-x-slate-800 border-b-slate-800"
  },
  offer: {
    label: "Offers",
    position: 4,
    color: "bg-[#0f172a] border-t-4 border-t-emerald-500 border-x-slate-800 border-b-slate-800"
  },
  rejected: {
    label: "Rejected",
    position: 5,
    color: "bg-[#0f172a] border-t-4 border-t-rose-500 border-x-slate-800 border-b-slate-800"
  },
  draft: {
    label: "Drafts",
    position: 6,
    color: "bg-[#0f172a] border-t-4 border-t-slate-500 border-x-slate-800 border-b-slate-800"
  },
};

const StatCard = ({ title, count, successPercentage }: StatCardProps) => {
  return (
    <div className={`border rounded-xl shrink-0 p-6 w-80 cursor-pointer shadow-md ${statusMapping[title as JobStatus].color}`}>
      <p className="text-slate-400 font-bold text-xl">
        {statusMapping[title as JobStatus].label ?? title}
      </p>
      <div className="my-4 flex items-baseline gap-2">
        <h3 className="text-slate-200 font-extrabold text-6xl">{count}</h3>
        {/* <span className="font-bold text-xl text-emerald-400">+12%</span> */}
      </div>
      <Link href={"/dashboard/jobs"} className="text-base font-bold text-slate-400 hover:underline">View More</Link>
    </div>
  );
};

const Page = () => {
  const [metricsData, setMetricsData] = useState<metricsDataType[]>([]);

  const getMetricsData = async () => {
    const result = await getUserJobMetrics();

    if (result.success) {
      setMetricsData(result.data ?? []);
    } else {
      toast.error(result.message);
    }
  };

  useEffect(() => {
    getMetricsData();
  }, []);

  const sortedMetricsData = [...metricsData].sort(
    (a, b) => statusMapping[a.status].position - statusMapping[b.status].position,
  );

  return (
    <div className="w-full p-6">
      <section className="dashboard-metrics flex gap-x-7 overflow-x-auto pb-4 font-mono">
        {sortedMetricsData.map((value, idx) => {
          console.log(value);
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
