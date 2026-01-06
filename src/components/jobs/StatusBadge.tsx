import { JobStatus } from "@/types";
import React from "react";

type StatusBadge = {
  status: JobStatus;
};

const getIcon = (icon: JobStatus) => {
    
}

const StatusBadge = ({ status }: StatusBadge) => {
  return <span className="">
    {status}
    </span>;
};

export default StatusBadge;
