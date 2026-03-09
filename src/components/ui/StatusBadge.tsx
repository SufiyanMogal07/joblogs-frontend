import { JobStatus } from "@/constants/enums";


type StatusBadge = {
  status: JobStatus;
};


const StatusBadge = ({ status }: StatusBadge) => {
  return <span className="">
    {status}
    </span>;
};

export default StatusBadge;
