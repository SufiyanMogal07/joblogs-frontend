import { JobApplication } from "@/types";
import React from "react";


const JobStats: React.FC<{jobs: JobApplication[]}> = ({jobs}) => {

  
  return (
    <ul className="flex flex-wrap justify-center uppercase font-semibold my-5 md:gap-x-5">
      <li className="bg-blue-500/20 p-1 px-3 md:rounded-md">Applied Jobs : {0}</li>
      <li className="bg-green-500/20 p-1 px-3 md:rounded-md">Offer : {0}</li>
      <li className="bg-red-500/20 p-1 px-3 md:rounded-md">Rejected : {0}</li>
    </ul>
  );
};

export default JobStats;
