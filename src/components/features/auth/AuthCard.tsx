import React from "react";

type AuthCardProps = {
  children: React.ReactNode;
  title: string;
  subHeading?: string;
};

const AuthCard = ({
  children,
  title,
  subHeading = "Create your account to get started",
}: AuthCardProps) => {
  return (
    <div className="w-full max-w-[90%] md:max-w-md p-6 md:p-8 lg:p-10 bg-slate-900 border border-slate-700 shadow-lg rounded-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        {subHeading && (
          <p className="text-[15px] text-slate-400">{subHeading}</p>
        )}
      </div>
      {children}
    </div>
  );
};

export default AuthCard;
